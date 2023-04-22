import compose from 'compose-function'
import {withLocalisation} from './with-localisation'
import {withQuery} from './with-query'
import {withRouter} from './with-router'
import {withStore} from './with-store'

export const withProviders = compose(withStore, withQuery, withRouter, withLocalisation)
