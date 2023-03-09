
import './App.css';
import React, { useEffect } from 'react';
import Sidebar from "react-sidebar";
import { useState } from 'react';
import backbutton from "./image/backbutton.svg"
import bin from './image/delete.svg'
import Select from 'react-select'
function App() {
  let [name, setname] = useState("")
  let [first_name, setfirst_name] = useState([
    {
      label: "Raghavan",
      value: "raghavan"
    }, {
      label: "Santhosh",
      value: "santhosh"
    }
  ])
  let [last_name, setlast_name] = useState([
    {
      label: "Raghavan",
      value: "raghavan"
    }, {
      label: "Santhosh",
      value: "santhosh"
    }
  ])
  let [account_name, setaccount_name] = useState([
    {
      label: "Parent",
      value: "parent"
    }, {
      label: "Child",
      value: "child"
    }
  ])
  let [city, setcity] = useState([
    {
      label: "Chennai",
      value: "chennai"
    }
  ])
  let [gender, setgender] = useState([
    {
      label: "Male",
      value: "male"
    }, {
      label: "FeMale",
      value: "female"
    }
  ])
  let [state, setstate] = useState([
    {
      label: "Tamilnadu",
      value: "tamilnadu"
    }
  ])
  const [age, setage] = useState([])
  const [validate, setvalidate] = useState(false)
  const [isDialogOpen, setisDialogOpen] = useState(false)
  const [schemaselect, setschemaselect] = useState(false)
  const [selectedval, setselectedval] = useState([])
  const [options, setoptions] = useState([
    {
      value: "first_name",
      label: "First Name", order: 1
    },
    {
      value: "last_name",
      label: "Last Name", order: 2
    },
    {
      value: "age",
      label: "Age", order: 3
    },
    {
      value: "gender",
      label: "Gender", order: 4
    },

    {
      value: "account_name",
      label: "Account Name", order: 5
    },
    {
      value: "city",
      label: "City", order: 6
    },
    {
      value: "state",
      label: "State", order: 7
    }

  ])
  useEffect(() => {
    let arr=[]
    for (let i = 0; i < 100; i++) {
      arr.push({ value: i + 1, label: i + 1 })

    }
    setage(arr)
  }, [])
  useEffect(() => {
    options.sort((a, b) => a.order - b.order);
    setoptions(options);
  }, [options])
  function handleSave() {
    if (name === "" || selectedval.length === 0) {
      setvalidate(true)
    } else {
      let obj = {}
      obj["segment_name"] = name
      let arr = []
      for (let i = 0; i < selectedval.length; i++) {
        const element = selectedval[i];
        let schemaobj = {}
        schemaobj[`${element.value}`] = element.label
        arr.push(schemaobj)
      }
      obj['schema'] = arr
      handleClose()
      console.log(obj)

    }

  }
  function handleClose() {

    setisDialogOpen(!isDialogOpen)
    setname("")
    setselectedval([])
    setvalidate(false)
    setschemaselect(false)
    setoptions([
      {
        value: "first_name",
        label: "First Name", order: 1
      },
      {
        value: "last_name",
        label: "Last Name", order: 2
      },
      {
        value: "age",
        label: "Age", order: 3
      },
      {
        value: "gender",
        label: "Gender", order: 4
      },

      {
        value: "account_name",
        label: "Account Name", order: 5
      },
      {
        value: "city",
        label: "City", order: 6
      },
      {
        value: "state",
        label: "State", order: 7
      }
    ])
  }
  function selectbox(e) {
    let arr = []
    for (let i = 0; i < options.length; i++) {
      const element = options[i];
      if (e[0].value !== element.value) {
        arr.push(element)
      }

    }
    setoptions(arr)
    setselectedval(selectedval.concat(e))
    setschemaselect(false)
  }
  function delete_(e) {
    let arr = []
    for (let i = 0; i < selectedval.length; i++) {
      const element = selectedval[i];
      if (e.value !== element.value) {
        arr.push(element)
      }

    }
    setselectedval(arr)
    setoptions(options.concat([e]))
  }
  return (
    <div className="App">
      <Sidebar
        sidebar={<div className='sidebar' >
          <div className='sidebar_header'>
            <div className="sidebarheader-text">
              Saving Segment
            </div>

            <img
              onClick={() => handleClose()}
              className="back-image"
              src={backbutton}
              alt="test"
            />
          </div>

          <div className='sidebar_body'>
            <div>
              <div className='form__input_title'>Enter the name of the Segment</div>
              <input value={name} type="text" class="form__input" id="name" placeholder="Name of the Segment" required="" onChange={(e) => { setname(e.target.value) }} />
              {validate && name === "" && <div className='form__input_title_validate'>Segment name is required</div>}
            </div>
            <div>
              <div className='form__input_title'>To save your Segment you need to add the schemas to build the query</div>
              <div className='marker_div'>
                {
                  selectedval.map((item, index) => {
                    return (
                      <div key={index} className={'marker'}>
                        <div className={`${item.value} dot dotMarker`}>
                        </div>
                        <span className='dot_marker_txt'>{item.label}</span>
                      </div>
                    )
                  })
                }
              </div>

            </div>
            <div className='dynamic_select_container'>
              {
                selectedval.map((item, index) => {
                  return (
                    <div className='dynamic_select'>
                      <div className={`${item.value} dot`}>

                      </div>
                      <div className='select_area'>

                        <div key={index}>
                          <Select
                            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                            menuPortalTarget={document.body}
                            menuShouldScrollIntoView={true}
                            menuPlacement={`auto`}
                            // onChange={(e) => selectbox(e)}
                            options={item.value === "first_name" ? first_name : item.value === "age" ? age : item.value === "city" ? city : item.value === "state" ? state : item.value === "gender" ? gender : item.value === "last_name" ? last_name : account_name}
                            placeholder={`${item.label}`}
                          />
                        </div>

                      </div>
                      <img
                        onClick={() => delete_(item)}
                        className="back-image bin"
                        src={bin}
                        alt="test"

                      />
                    </div>
                  )
                })
              }
              <div>

              </div>

            </div>
            {validate && selectedval.length === 0 && <div className='form__input_title_validate'>Schema is required</div>}
            <div>
              <div onClick={() => { setschemaselect(true) }} className='new_schema_link'>+ Add new schema</div>
              {schemaselect && <Select
                isMulti={true}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                menuPortalTarget={document.body}
                menuShouldScrollIntoView={true}
                menuPlacement={`auto`}
                onChange={(e) => selectbox(e)}
                options={options}
                placeholder={'Add schema to segment'}
              />}
            </div>
          </div>
          <div className='sidebar_tail'>
            <button className='button' onClick={() => handleSave()}>Save the segment</button>
            <button className='button cancel' onClick={() => handleClose()}>Cancel</button>
          </div>


        </div>}
        open={isDialogOpen}
        onSetOpen={isDialogOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        <button className='button' onClick={() => handleClose()}>
          Save Segment
        </button>
      </Sidebar>
    </div>
  );
}

export default App;
