import React, { useState } from 'react'
import "./Dropdown.css";

function Dropdown({ id, setSearchPosition, setSearchLevel }) {

    const levels = ["Junior", "Medior", "Senior", "Expert", "Godlike"];
    const positions = ["Main Actor", "Comic Relief", "Love Interests", "Protagonist", "Antagonist", "Operatour", "Director", "Joker", "Superhero"];
    const [isOpen, setIsOpen] = useState(false);
    const [isLevelFilterActive, setIsLevelFilterActive] = useState(false);

    function toggleDropdown() {
        setIsOpen((prev) => !prev);
    };

    //FILTERING LEVELS
    function clikcOnFilterLevel(e) {
        setSearchLevel(e.target.id);
        console.log("Level", e.target.id);
        setIsOpen((prev) => !prev);
        console.log("Filter by level");
        setIsLevelFilterActive(true);
    };

    //FILTERING POSITIONS
    function clikcOnFilterPosition(e) {
        setSearchPosition(e.target.id);
        setIsOpen((prev) => !prev);
        console.log("Filter by position");
        setIsLevelFilterActive(false);
    };

    function renderDropdown() {
        return (
            <>
                {!isOpen ?
                    (
                        <div>
                            <button className='filter-button' onClick={toggleDropdown} id={id}>
                                Filter
                                <span className={`arrow ${isOpen ? 'up' : 'down'}`}>&#9660;</span>
                            </button>
                        </div>
                    ) :
                    (<>{id === 'level' ? (
                        <>
                            <button className={isLevelFilterActive ? 'filter-button:active' : 'filter-button'} onClick={toggleDropdown} id={id}
                            >
                                Filter
                                <span className={`arrow ${isOpen ? 'up' : 'down'}`}>&#9660;</span>
                            </button>
                            <div className='filter-list'>
                                {levels.map((level, i) => (
                                    <div key={i} className='level-filters'>
                                        <h3 key={level} onClick={clikcOnFilterLevel} id={level}>
                                            {level}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <button className='filter-button' onClick={toggleDropdown} id={id}>
                                Filter
                                <span className={`arrow ${isOpen ? 'up' : 'down'}`}>&#9660;</span>
                            </button>
                            <div className='filter-list'>
                                {positions.map((position, i) => (
                                    <div key={i} className='position-filters'>
                                        <h3 key={position} onClick={clikcOnFilterPosition} id={position}>
                                            {position}
                                        </h3>
                                    </div>
                                ))}
                            </div></>
                    )}</>)}
            </>
        );
    };

    return <>{renderDropdown()}</>;
}

export default Dropdown;