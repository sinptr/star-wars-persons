import React from 'react'
import {connect} from 'react-redux'
import Filter from "../../components/Filter";
import {genders} from "../../config/config";
import FilterBlock from "../../components/FilterBlock";
import {changeFilter, clearFilter} from "../../actions";

const FilterList = ({filter, changeFilter, clearFilter}) => {
    return (
        <FilterBlock title="Фильтр">
            {console.log('eeeeeeeeeeeeeeeeee')}
            <Filter
                title="Пол"
                value={filter.gender}
                name="gender"
                caption="Выберите пол"
                options={genders}
                onChange={changeFilter}
            />
            <button onClick={clearFilter}>Сбросить</button>
        </FilterBlock>
    )
};

const mapStateToProps = (state) => ({
    filter: state.persons.filter,
});

const mapDispatchToProps = (dispatch) => ({
    changeFilter: data => dispatch(changeFilter(data)),
    clearFilter: () => dispatch(clearFilter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterList)