import React, {useCallback, useMemo} from 'react'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import URI from 'urijs'
import './style.styl';
import {
  exchangeFromTo,
  fetchCityData,
  hideCitySelector,
  hideDateSelector,
  setDepartDate,
  setHighSpeed,
  setSelectedCity,
  showCitySelector,
  showDateSelector
} from '../../store/modules/home/actions';

import DepartDateComponent from "./DepartDate";
import HighSpeedComponent from "./HighSpeed";
import JourneyComponent from "./Journey";
import SubmitComponent from "./Submit";
import CitySelectorComponent from "../../components/CitySelector";
import DateSelectorComponent from "../../components/DateSelector";
import HeaderComponent from "../../components/Header";
import {h0} from "../../utils";
import dayjs from "dayjs";

function HomePage(props) {
  const {from, to, isCitySelectorVisible, isDateSelectorVisible, cityData, isLoadingCityData, departDate, highSpeed, dispatch} = props

  const handleBack = useCallback(() => {
    window.history.back()
  }, [])

  const journeyCbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch)
  }, [dispatch])

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideCitySelector,
      fetchCityData,
      onSelect: setSelectedCity
    }, dispatch)
  }, [dispatch])

  const departDateCbs = useMemo(() => {
    return bindActionCreators({
      onClick: showDateSelector
    }, dispatch)
  }, [])

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideDateSelector
    }, dispatch)
  }, [])

  const onSelectDate = useCallback((day) => {
    if (!day || day < h0()) {
      return
    }
    dispatch(setDepartDate(day))
    dispatch(hideDateSelector())
  }, [])

  const highSpeedCbs = useMemo(() => {
    return bindActionCreators({
      toggle: setHighSpeed
    }, dispatch)
  }, [])

  const onSubmit = useCallback(() => {
    window.location.href = new URI('/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed', highSpeed)
      .toString()
  }, [from, to, departDate, highSpeed])

  return (
    <div className={"home-wrapper"}>
      <HeaderComponent onBack={handleBack} title={"火车票"} />
      <div style={{padding: '10px'}}>
        <JourneyComponent from={from} to={to} {...journeyCbs}/>
        <DepartDateComponent time={departDate} {...departDateCbs}/>
        <HighSpeedComponent highSpeed={highSpeed} {...highSpeedCbs}/>
        <SubmitComponent onClick={onSubmit}/>
        <CitySelectorComponent show={isCitySelectorVisible} cityData={cityData} isLoading={isLoadingCityData} {...citySelectorCbs}/>
        <DateSelectorComponent show={isDateSelectorVisible} {...dateSelectorCbs} onSelect={onSelectDate}/>
      </div>
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state.home
  },
  function mapDispatchToProps(dispatch) {
    return {dispatch}
  }
)(HomePage);
