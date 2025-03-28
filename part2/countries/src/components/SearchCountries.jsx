const SearchCountries = ({ searchCountry, handleSearchChange }) => {
    return (
        <div>
            find countries <input value={searchCountry} onChange={handleSearchChange} />
        </div>
    )
}

export default SearchCountries