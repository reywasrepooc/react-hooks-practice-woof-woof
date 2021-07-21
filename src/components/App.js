import React, { useEffect, useState } from "react";

const App = () => {
  const [dogs, setDogs] = useState([])
  const [dogClicked, setDogClicked] = useState({})
  const [goodDogFilter, setGoodDogFilter] = useState(false)
  const dogsURL = "http://localhost:3001/pups"

  useEffect(() => {
    fetch(dogsURL)
      .then(resp => resp.json())
      .then(data => setDogs(data))
  }, [])

  const handleDogClick = (id) => {
    setDogClicked(dogs.find(dog => id === dog.id))
  }

  const handleUpdateIsGood = () => {
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        ...dogClicked,
        isGoodDog: !dogClicked.isGoodDog
      })
    }

    fetch(`${dogsURL}/${dogClicked.id}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        const updatedDogs = dogs.map(dog => {
          if (dog.id === dogClicked.id) {return data}
          else {return dog}
        })

        setDogs(updatedDogs)
        setDogClicked(data)
      })
  }

  const handleUpdateGoodDogFilter = () => {
    setGoodDogFilter((goodDogFilter) => !goodDogFilter)
  }

  const dogBarItems = dogs.map(dog => {
    if (goodDogFilter === false || dog.isGoodDog === true) {
      return <span key={dog.id} onClick={() => handleDogClick(dog.id)}>{dog.name}</span>
    }
    return null
  })

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={handleUpdateGoodDogFilter}>Filter good dogs: {goodDogFilter ? "ON" : "OFF"}</button>
      </div>
      <div id="dog-bar">
        {dogBarItems}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <img src={dogClicked.image} alt={dogClicked.name} height="400px"/>
        <h2>{dogClicked.name}</h2>
        <button onClick={handleUpdateIsGood}>{dogClicked.isGoodDog ? "Bad Dog!" : "Good Dog!"}</button>
        <div id="dog-info"></div>
      </div>
    </div>
  )
}

export default App