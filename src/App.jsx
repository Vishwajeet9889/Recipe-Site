import { useState } from 'react'
import './main.css'
function App() {
  const  [query, setQuery] = useState("");
  const [showDpanel,setshowDpanel]=useState(false);
  const  [output, setOutput] = useState([]);
  const  [showdata, setShowdata] = useState("");
  const api_key="L/N2JvnAg5+ynmJFW6V82g==9c1zCCiugKXfpyxr";
  const get_recipi=async()=>{
    if(query.length == 0){
      return ;
    }
    $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
      headers: { 'X-Api-Key': api_key},
      contentType: 'application/json',
      success: function(result) {
          var x=[]
          for(var i=0;i<5;i++){
            if (result[i]){
              x.push(result[i])
            }
          }
          setOutput(x);
      },
      error: function ajaxError(jqXHR) {
          console.error('Error: ', jqXHR.responseText);
      }
  });
  }
  const showdetais=(btn)=>{
    var itmind=btn.target.getAttribute('data-index');
    console.log(output[itmind]);
    setshowDpanel(true);
    setShowdata(JSON.stringify(output[itmind]));
  }
  return (
    <>
    {/* search box  */}
    <div  className='searchcont'>
      <span>Find Best Recipe</span>
    <input type="text" onChange={(e)=>{
      setQuery(e.target.value);
    }} onSubmit={get_recipi} placeholder='Enter Dish Name'/>
    <button type="button" onClick={get_recipi}> Search</button>

    </div>
    {/* result cards  */}
    <div className='resultscont'> 
      {
      output.map((i,d) => (
        <div onClick={showdetais} data-index={d} key={d}>
          <span>Item Code : IT0{d}A9J</span>
          {i['title']}
        </div>
      ))
      }
    </div>

    {/* tutorial show panel  */}
    {showDpanel==true?
        <div className='showpanel'>
          <span onClick={()=>{setshowDpanel(false)}}>x</span>
          <div>{JSON.parse(showdata)['title']}</div>
          <div>
            <span>Requirements :</span>
            
            {String(JSON.parse(showdata)['ingredients']).split("|")
          .map((itm,d)=>{
            return <>
            <li key={d}>{itm}</li>
            </>
          })}
          </div>
          <hr />
          <div>
            <span>Instructions to follow : </span>
            {String(JSON.parse(showdata)['instructions']).split(".")
          .map((itm,d)=>{
            return <>
             {itm.length>3?<li key={d}>{itm}</li>:null}
            </>
          })}
          </div>
        </div>
        :null
    }
    </>
  )
}

export default App
