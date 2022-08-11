import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import { actLogout } from '../../redux/actions/userAction';
import './animal.css'
const Animal = () => {
    const [listAnimals, setListAnimals] = useState('');
    const { users } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState(
        {
            current_page: 1,
            total_pages: 6078,
        }
    )
    const [filters, setFilters] = useState({
        current_page: 1
    })

    useEffect(() => {
        function fetchAnimals() {
            const axios = require('axios');
            const data = '';

            const config = {
                method: 'get',
                url: `https://api.petfinder.com/v2/animals?type=dog&page=${filters.current_page}`,
                headers: {
                    'Authorization': `Bearer ${users}`,
                },
                data: data
            };

            axios(config)
                .then(function (res) {
                    const resData = res.data.animals
                    const resPagination = res.data.pagination
                    setListAnimals(resData);
                    setPagination(resPagination)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        fetchAnimals();
    }, [filters])

    const handleLogOut = () => {
        setTimeout(() =>
            dispatch(actLogout())
            , 1000)
    }

    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            current_page: newPage
        })
    }

    return (
        < >
            <div className="topnav">
                <span className="split" onClick={handleLogOut}>LogOut</span>
            </div>
            <div className="animal-container">
                <h1>List Animals</h1>
                <div className="card-animals">
                    {listAnimals && listAnimals.length > 0 && listAnimals.map(item => {
                        const image = item?.photos[0]?.full
                        return (
                            <div key={item.id} className="card">
                                <h3>{item.name}</h3>
                                <img className="img" src={image ? image : "https://www.cityofboise.org/media/4036/puppy.jpg?width=1200&mode=max&upscale=false"} alt="fennec-fox" />
                                <div className="info">
                                    <ul>
                                        <li><span>Organization_id</span>: {item.organization_id}</li>
                                        <div className="animal-group">
                                            <li><span>Age</span>: {item.age}</li>
                                            <li><span>Gender</span>: {item.gender}</li>
                                        </div>
                                        <div className="animal-group">
                                            <li><span>Size</span>: {item.size}</li>
                                            <li><span>Coat</span>: {item.coat}</li>
                                        </div>
                                        <li className="decription"><span>Description</span>: {item.description}</li>
                                        <li><span>Published_at</span>: {(item.published_at)}</li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Pagination pagination={pagination} onPageChange={handlePageChange} />
            </div>
        </>
    );
};

export default Animal;