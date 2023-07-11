export default function SearchBar({setFilter}) {
    function onInputChange(event) {
        setFilter(event.target.value)
    }
    return <>
        <input onChange={onInputChange} placeholder="Search by name..." />
    </>
}
