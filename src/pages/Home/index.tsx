import {FC, useEffect, useState} from 'react'
import {CustomSelect} from "core";
import API from '../../networking/queries';



interface IProps {}


export const Home:FC<IProps>= ():JSX.Element=>{
    let [data, setData] = useState([
        { name: 'The Shawshank Redemption', id:1 },
        { name: 'The Godfather', id:2},
        { name: 'The Godfather: Part II', id:3 },
        { name: 'The Dark Knight', id:4 },
        { name: '12 Angry Men',id:5 },
        { name: "Schindler's List", id:6 },
    ])
    let apigraphql = new API();

    useEffect(() => {
        apigraphql.getList()
            .then(res => {
                setData(res.data)
            })
            .catch(e => {
                console.log(e);
            })
    }, [])

    return (
        <CustomSelect data={data} onChange={(e)=>{
            console.log(e)}
        }/>
    )
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

