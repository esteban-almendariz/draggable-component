import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'

const itemsFromBackend = [
  { id: uuidv4(), content: 'First Task'},
  { id: uuidv4(), content: 'Second Task'}
]

const columnsFromBackend = {
  
    [uuidv4()]: {
      name: 'Todo',
      items: itemsFromBackend
    },
    [uuidv4()]: {
      name: 'In Progress',
      items: []
    }
  
}

const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return
  const {source, destination} = result
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId]
  const copiedItems = [...column.items]
  const [removed] = copiedItems.splice(source.index, 1)
  copiedItems.splice(destination.index, 0 , removed)
  setColumns({
    ...columns,
    [source.droppableId]: {
      ...column,
      items: copiedItems
    }
  })
  }
  
}

function App() {
  
  const [columns, setColumns] = useState(columnsFromBackend)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%'}}>
      <DragDropContext onDragEnd= {result => onDragEnd(result, columns, setColumns)}>
        {/* Each droppable will have its own key */}
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
              <h2>{column.name}</h2>
              <div style={{margin: 8}}>
                <Droppable key={id} droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      padding: 16,
                                      margin: '0 0 8px 0',
                                      minHeight: '50px',
                                      backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                      color: 'white',
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                )
                              }}

                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </div>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  )

// source: https://www.youtube.com/watch?v=Vqa9NMzF3wc&t=541s

}

export default App
