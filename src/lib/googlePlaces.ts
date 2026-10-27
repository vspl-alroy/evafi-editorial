// Loads Google Maps' Places library in the browser for the address autocomplete (NoSellShare's "Full address").
// EvaFi does this with @googlemaps/js-api-loader + @types/google.maps; here it's a script tag and the few types we use.
// Key: GATSBY_GOOGLE_MAPS_API_KEY (EvaFi: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY). It ends up in the page, like every Maps
// browser key, so restrict it to this site's domain in Google Cloud. Without a key the field is a plain text input.

export interface PlacePrediction {
  placeId: string
  text: { text: string }
  toPlace(): { fetchFields(o: { fields: string[] }): Promise<unknown>; formattedAddress?: string | null }
}
export interface AutocompleteSuggestion { placePrediction: PlacePrediction | null }
export type AutocompleteSessionToken = object
export interface PlacesLibrary {
  AutocompleteSessionToken: new () => AutocompleteSessionToken
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions(request: {
      input: string
      includedPrimaryTypes?: string[]
      sessionToken?: AutocompleteSessionToken
    }): Promise<{ suggestions: AutocompleteSuggestion[] }>
  }
}

type GoogleMaps = { maps: { importLibrary(name: "places"): Promise<PlacesLibrary> } }
const CALLBACK = "__daGoogleMapsReady"
let loading: Promise<PlacesLibrary> | undefined

export function loadPlacesLibrary(): Promise<PlacesLibrary> {
  const key = process.env.GATSBY_GOOGLE_MAPS_API_KEY
  if (!key) return Promise.reject(new Error("GATSBY_GOOGLE_MAPS_API_KEY is not defined"))
  loading ??= new Promise<PlacesLibrary>((resolve, reject) => {
    const w = window as unknown as Record<string, unknown> & { google?: GoogleMaps }
    w[CALLBACK] = () => w.google!.maps.importLibrary("places").then(resolve, reject)
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly&loading=async&callback=${CALLBACK}`
    script.async = true
    script.onerror = () => { loading = undefined; reject(new Error("Google Maps script failed to load")) }
    document.head.appendChild(script)
  })
  return loading
}
