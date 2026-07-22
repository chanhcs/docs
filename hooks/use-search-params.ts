import { useQueryState, parseAsString } from "nuqs"

export function useSearchParam(key: string) {
    return useQueryState(
        key,
        parseAsString.withDefault("")
    );
}