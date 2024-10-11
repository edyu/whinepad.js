import {useState} from 'react'

import Header from './Header'
import Body from './Body'
import Excel from './Excel'
import schema from '../config/schema'
import DataContext from '../contexts/DataContext'
import clone from '../modules/clone'

let initialData = JSON.parse(localStorage.getItem('data'))

// default example data, read from the schema
if (!initialData) {
  initialData = [{}]
  Object.keys(schema).forEach(
    (key) => (initialData[0][key] = schema[key].samples[0])
  )
}

function commitToStorage(data) {
  localStorage.setItem('data', JSON.stringify(data))
}

function DataFlow() {
  const [data, setData] = useState(initialData)
  const [filter, setFilter] = useState(null)

  function updateData(newData) {
    newData = clone(newData)
    commitToStorage(newData)
    setData(newData)
  }

  function onSearch(e) {
    const s = e.target.value
    setFilter(s)
  }

  return (
    <div className="DataFlow">  
      <DataContext.Provider value={{data, updateData}}>
        <Header onSearch={onSearch} />
        <Body>
          <Excel filter={filter} />
        </Body>
      </DataContext.Provider>
    </div>
  )
}

export default DataFlow

