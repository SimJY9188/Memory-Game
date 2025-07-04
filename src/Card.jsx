function Card ({ item, handleSelectedCardFunction, toggled, stopFlip }) {
    return (
        <div className="item">
            <div className={toggled ? "toggled" : ""}>
                <img className="face" src={item.img} alt="face" />
                <div className="back" onClick={() => !stopFlip && handleSelectedCardFunction(item)} />
            </div>
        </div>
    )
}

export default Card;