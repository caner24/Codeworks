import React from 'react'
import Router from './Router'
import FavoriteProvider from './context/FavoriteProvider/FavoriteProvider'

export default () => {
    return (
        <FavoriteProvider>
            <Router />
        </FavoriteProvider>
    )
}