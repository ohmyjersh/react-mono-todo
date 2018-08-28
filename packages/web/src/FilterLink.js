import React from "react"
import PropTypes from "prop-types"
import { Visbility } from "shared"
import Link from "./Link"

const FilterLink = props => (
  <Visbility.VisibilityContext.Consumer>
    {({ visibilityFilter, setVisibilityFilter }) => (
      <Link
        {...props}
        active={visibilityFilter === props.filter}
        onClick={() => setVisibilityFilter(props.filter)}
      />
    )}
  </Visbility.VisibilityContext.Consumer>
)

FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
}

export default FilterLink