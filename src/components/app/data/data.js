import React from 'react';
import PropTypes from 'prop-types';
import { Link, BrowserRouter as Router } from 'react-router-dom';

import Arrow from '../arrow';
import Detail from '../detail';
import Search from '../search';
import AddUser from '../add-user';
import './data.css';


const SHORT_URL = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
const BIG_URL = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';


export default class Table extends React.Component{

    state = {
        initialData: [],
        data: [],
        sorted: { id: false, firstName: false, lastName: false, email: false, phone: false },
        page: 0,
        loading: true,
        showDetail: false,
        detailInfo: {},
        filterData: [],
        showForm: false,
        showFilterData: false,
    }

    fetchData = () => {
        return fetch(this.props.urlType === 'short' ? SHORT_URL : BIG_URL).then(response => response.json());
    }

    dataSplitter = (data) => {
        const result = [];
        for(let i = 0; i < data.length/50; i++){
            result.push(data.slice(i, i + 50));
        }
        return result;
    }

    sortUsersBY = (by) => {
        const {sorted, data, page } = this.state;

        let sortData;

        if(by === 'id'){
            sortData = data[page].sort((a, b) => sorted[by] ? a.id - b.id : b.id - a.id);
        }else {
            sortData = data[page].sort((a, b) => sorted[by] ? (a[by].toLowerCase() > b[by].toLowerCase() ? 1 : -1) : (b[by].toLowerCase() > a[by].toLowerCase() ? 1 : -1));
        }
        this.setState(() => ({ data: [...data.slice(0, page), sortData, ...data.slice(page + 1)], sorted: { ...sorted, [by]: !sorted[by],  } }));
    }

    handlePage = (by) => {
        const { page } = this.state;
        by === 'next' ? this.setState(() => ({ page: page === 19 ? page :  page + 1 })) : this.setState(() => ({ page: page === 0 ? 0 : page - 1 }));
    }

    getInfo = (userId) => () => {
        const {page, data} = this.state;
        const res = data[page].filter(({id}) => id === userId);
        this.setState({detailInfo: res[0], showDetail: true});
    }

    closeShowDetail = () => {
        this.setState({showDetail: false});
    }

    closeDetail = () => {
        this.setState({showDetail: false});
    }

    filter = (inputValue, button) => {

        if(!inputValue.trim()){
            this.setState({filterData: [], showFilterData: false});
            return;
        }

        const checker = (name, subStr) => name.toLowerCase().startsWith(subStr.toLowerCase());

        const {data, page} = this.state;

        const filterData = data[page].filter(({firstName, lastName}) => {
            return checker(firstName, inputValue) || checker(lastName, inputValue);
        })

        if(button === 'back'){
            this.setState({filterData, showFilterData: false});
        }else {
            this.setState({filterData, showFilterData: true});
        }
    }

    addUser = (user) => {
        this.setState({initialData: [user, ...this.state.initialData], showForm: false});
    }

    openForm = () => {
        this.setState({ showForm: true });
    }

    componentDidMount(){
        this.fetchData().then(data => this.setState( { ...this.state, initialData: data, data: this.dataSplitter(data), loading: false } ));
    }

    componentDidUpdate(prevProps, prevState){

        if(prevState.initialData.length && prevState.initialData.length !== this.state.initialData.length){
            this.setState({data: this.dataSplitter(this.state.initialData)});
        }

    }

    render(){

        const { data, loading, page, sorted, showDetail, detailInfo, filterData, showForm, showFilterData } = this.state;

        const pages = Array.from({length: data.length}, (v, i) => i + 1);

        if(loading){
            return (
                <h1 className="loading-container">loading...</h1>
            )
        }

        return (
                <div className="Table-container">
                {showDetail && <Detail info={detailInfo} closeShowDetail={this.closeShowDetail}/>}
                    <Search filter={this.filter}/>
                    <table border="1" className="Table">
                        <thead className="Table-head">
                            <tr>
                                {
                                    Object.keys(sorted).map((data, i) => {
                                        return <th key={i} onClick={() => this.sortUsersBY(data)}>{data} <Arrow sorted={sorted[data]}/> </th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody className="Table-body">
                            {
                                (showFilterData ? filterData : data[page]).map(({id, firstName, lastName, phone, email}, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td onClick={this.getInfo(id)}>{id}</td>
                                            <td onClick={this.getInfo(id)}>{firstName}</td>
                                            <td onClick={this.getInfo(id)}>{lastName}</td>
                                            <td onClick={this.getInfo(id)}>{email}</td>
                                            <td onClick={this.getInfo(id)}>{phone}</td>
                                        </tr>
                                    )                            
                                })
                            }
                        </tbody>          
                    </table>

                    <div className='buttons' style={ { display: data.length === 1 ? 'none' : 'flex' } }>
                        <Router>
                            <Link to={`/users/${page + 1}`}><button disabled={!page} className='btn'  onClick={this.handlePage}>&laquo; prev</button></Link>
                            { 
                                pages.slice(page > data.length - 5 ? data.length - 5 : page, page > data.length ? data.length:  page + 5).map(item => { 
                                    return <Link  key={item} to={`/users/${item}`}><button style={{padding: '10px 32px', margin: '4px 2px'}} className={page + 1 === item ? 'active' : ''} onClick={() => this.setState({page: item - 1})}>{item}</button></Link>
                                })
                            }
                            <Link to={`/users/${page + 1}`}><button disabled={data.length <= page + 1} className="btn" onClick={() => this.handlePage('next')}>next &raquo;</button></Link>
                        </Router>
                    </div>
                   

                    <button onClick={this.openForm} className="add_btn">add user</button>

                    {showForm && <AddUser addUser={this.addUser}/>}
  
                </div>
        )
    }
}

Table.propTypes = {
    urlType: PropTypes.string.isRequired
};
