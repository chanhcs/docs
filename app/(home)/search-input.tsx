'use client'

import { SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParam } from "@/hooks/use-search-params";
import { useRef, useState } from "react";

const SearchInput = () => {
    const [value, setValue] = useState("")
    const [search, setSearch] = useSearchParam("result")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleClear = () => {
        setValue("")
        setSearch("")
        inputRef.current?.blur()
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearch(value)
        inputRef.current?.blur()
    }

    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="relative w-full max-w-180">
                <form onSubmit={handleSubmit}>
                    <Button
                        type="submit"
                        className="absolute inset-y-0 left-3 my-auto rounded-full"
                        variant="ghost"
                        size="icon"
                    >
                        <SearchIcon />
                    </Button>
                    <input
                        value={value}
                        type="text"
                        ref={inputRef}
                        onChange={handleInputChange}
                        placeholder="Search"
                        className="h-12 w-full rounded-full bg-[#F0F4F8] pl-14 pr-6 placeholder:text-neutral-700 focus:bg-white focus:shadow-md focus:outline-none"
                    />
                    {value && (
                        <Button
                            onClick={handleClear}
                            type="button"
                            className="absolute inset-y-0 right-3 my-auto rounded-full"
                            variant="ghost"
                            size="icon"
                        >
                            <X />
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SearchInput;
