const GenreItem = (props, key) => {

    return (
        <div key={key} className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={() => props.setFavGenres(props.genre)} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{props.genre.name}</label>
        </div>

    )
}

export default GenreItem;