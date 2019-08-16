import React from 'react'
import classNames from 'classnames';
import './VenueList.styles.css'

const VenueList = ({ venues = [], handleClick, activeVenueID }) => (
  <div>
    {venues.map(venue => (
      <div className={classNames({ activeVenue: activeVenueID === venue.properties.id })} key={venue.properties.id} onClick={handleClick(venue)}>
        name: {venue.properties.name}
      </div>
    ))}
  </div>
)

export default VenueList
