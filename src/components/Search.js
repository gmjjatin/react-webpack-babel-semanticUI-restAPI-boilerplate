import PropTypes from 'prop-types'
import _ from 'lodash'

import React, { Component } from 'react'
import { Search,Label } from 'semantic-ui-react'
import apis from '../api'
const initialState = { isLoading: false, results: [], value: '',source:[] }

const resultRenderer = ({ name }) => <Label content={name} />



export default class SearchBox extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.id })

    this.props.onChange(result.id);
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState({
        isLoading:initialState.isLoading,
        results:initialState.results,
        value:initialState.value,
      })

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.id)
      this.setState({
        isLoading: false,
        results: _.filter(this.state.source, isMatch),
      })


    }, 300)
  }

  componentWillMount(){
    apis.loadShipments().then(resp=>{

      this.setState({source:resp.data})
      console.log("line_id",this.state.source)
    })
  }
  render() {

    const { isLoading, value, results } = this.state

    return (
      <React.Fragment>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            resultRenderer={resultRenderer}
            results={results}
            value={value}

          />

        </React.Fragment>
    )
  }
}
