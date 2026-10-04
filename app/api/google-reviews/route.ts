import { NextResponse } from "next/server";
import { googleMapsUrl, type GoogleReview } from "@/lib/google-reviews";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const businessConfigured = process.env.GOOGLE_BUSINESS_REFRESH_TOKEN && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_BUSINESS_LOCATION;
  if (!key && !businessConfigured) return NextResponse.json({ available: false }, { status: 503, headers });
  try {
    if (businessConfigured) {
      const location = process.env.GOOGLE_BUSINESS_LOCATION!;
      if (!/^accounts\/[a-zA-Z0-9_-]+\/locations\/[a-zA-Z0-9_-]+$/.test(location)) throw new Error("Invalid business location");
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST", cache: "no-store", signal: AbortSignal.timeout(8000),
        body: new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID!, client_secret: process.env.GOOGLE_CLIENT_SECRET!, refresh_token: process.env.GOOGLE_BUSINESS_REFRESH_TOKEN!, grant_type: "refresh_token" }),
      });
      if (!tokenResponse.ok) throw new Error("Google authorization unavailable");
      const token = await tokenResponse.json();
      const reviews: GoogleReview[] = [];
      let pageToken = "";
      let rating = 0;
      let count = 0;
      const stars: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
      do {
        const query = new URLSearchParams({ pageSize: "50", orderBy: "updateTime desc" });
        if (pageToken) query.set("pageToken", pageToken);
        const response = await fetch(`https://mybusiness.googleapis.com/v4/${location}/reviews?${query}`, {
          cache: "no-store", signal: AbortSignal.timeout(8000), headers: { Authorization: `Bearer ${token.access_token}` },
        });
        if (!response.ok) throw new Error("Business reviews unavailable");
        const page = await response.json();
        if (typeof page.averageRating !== "number" || typeof page.totalReviewCount !== "number") throw new Error("Invalid business reviews");
        rating = page.averageRating; count = page.totalReviewCount;
        for (const review of page.reviews ?? []) reviews.push({ author: review.reviewer?.displayName ?? "Usuario de Google", photo: review.reviewer?.profilePhotoUrl, text: review.comment ?? "", rating: stars[review.starRating] ?? 0, url: googleMapsUrl });
        pageToken = page.nextPageToken ?? "";
      } while (pageToken);
      return NextResponse.json({ rating, count, reviews, live: true, checkedAt: new Date().toISOString(), url: googleMapsUrl, source: "business" }, { headers });
    }
    if (!key) throw new Error("Missing Places key");
    let placeId = process.env.GOOGLE_PLACE_ID;
    if (!placeId) {
      const search = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST", cache: "no-store", signal: AbortSignal.timeout(8000),
        headers: { "Content-Type": "application/json", "X-Goog-Api-Key": key, "X-Goog-FieldMask": "places.id,places.location,places.displayName" },
        body: JSON.stringify({ textQuery: "Autotronica Godiag Caracas Venezuela", languageCode: "es", locationBias: { circle: { center: { latitude: 10.4527433, longitude: -66.9326245 }, radius: 500 } } }),
      });
      if (!search.ok) throw new Error("Place lookup failed");
      const result = await search.json();
      // Do not accidentally show reviews from a similarly named business.
      placeId = result.places?.find((place: { id: string; displayName?: { text: string }; location?: { latitude: number; longitude: number } }) =>
        /godiag/i.test(place.displayName?.text ?? "") && place.location &&
        Math.abs(place.location.latitude - 10.4527433) < 0.002 && Math.abs(place.location.longitude + 66.9326245) < 0.002)?.id;
      if (!placeId) throw new Error("Business not identified");
    }
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es`, {
      cache: "no-store", signal: AbortSignal.timeout(8000),
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri" },
    });
    if (!response.ok) throw new Error("Reviews unavailable");
    const place = await response.json();
    if (typeof place.rating !== "number" || typeof place.userRatingCount !== "number" || !Array.isArray(place.reviews)) throw new Error("Invalid reviews response");
    const reviews: GoogleReview[] = place.reviews.map((review: { authorAttribution?: { displayName?: string; uri?: string; photoUri?: string }; rating: number; text?: { text?: string }; googleMapsUri?: string }) => ({
      author: review.authorAttribution?.displayName ?? "Usuario de Google", rating: review.rating,
      text: review.text?.text ?? "", url: review.googleMapsUri ?? review.authorAttribution?.uri,
      photo: review.authorAttribution?.photoUri,
    }));
    return NextResponse.json({ rating: place.rating, count: place.userRatingCount, reviews, live: true, checkedAt: new Date().toISOString(), url: place.googleMapsUri ?? googleMapsUrl }, { headers });
  } catch {
    return NextResponse.json({ available: false }, { status: 502, headers });
  }
}
