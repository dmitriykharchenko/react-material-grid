import './layout.css'
import './layouts.css'

import React from 'react'
import { is, join, split, map, keys, reduce } from 'ramda'

const { PropTypes } = React

const camelToDash = (string) => {
  return string.replace(/([A-Z])/g, function(substr, match){
    return '-' + match.toLowerCase()
  })
}

const combineValueAndAttr = (attrName, attrValue) => {
  var value = attrValue
  if(is(String, value)){
    value = join('-', split(/\s+/, attrValue))
  }

  return `${ camelToDash(attrName) }-${ value }`
}

const gridPropsRegexp = /^flex|^layout|^hide/

const propProcessors = {
  flex(value){
    if(!value || value === 'flex' || value === true){
      return 'flex'
    } else {
      return combineValueAndAttr('flex', value)
    }
  },

  default(value, attrName){
    if(value && value !== attrName && value !== true){
      return combineValueAndAttr(attrName, value)
    } else {
      return camelToDash(attrName)
    }
  }
}

const Grid = (props) => {

  let passingProps = {}

  let classes = map(function(attrName){
    if(attrName.match(gridPropsRegexp)){
      let processor = propProcessors[attrName] || propProcessors.default
      return processor(props[attrName], attrName)
    } else {
      passingProps[attrName] = props[attrName]
    }
  }, keys(props)).join(' ').concat(props.className || '')

  if(props.element){
    return (
      <props.element {...passingProps} className={ classes}>
        { props.children }
      </props.element>
    )
  } else {
    return (
      <div {...passingProps} className={ classes }>
        { props.children }
      </div>
    )
  }
}

const attrSizedProptypesGenerator = (attrName, type) => {
  const sizes = ['Xs', 'GtXs', 'Sm', 'GtSm', 'Md', 'GtMd', 'Lg', 'GtLg', 'Xl']
  return reduce((types, size) => {
    types[`${ attrName }${ size }`] = type
    return types
  }, {}, sizes)
}

Grid.propTypes = {
  flex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
  ]),
  ...attrSizedProptypesGenerator('flex', PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ])),

  flexOffset: PropTypes.number,
  ...attrSizedProptypesGenerator('flexOffset', PropTypes.number),

  flexOrder: PropTypes.number,
  ...attrSizedProptypesGenerator('flexOrder', PropTypes.number),

  layout: PropTypes.string,
  ...attrSizedProptypesGenerator('layout', PropTypes.string),

  layoutAlign: PropTypes.string,
  ...attrSizedProptypesGenerator('layoutAlign', PropTypes.string),

  ...attrSizedProptypesGenerator('hide', PropTypes.string),
  ...attrSizedProptypesGenerator('show', PropTypes.string),

  layoutWrap: PropTypes.string,

  element: PropTypes.element
}

export default Grid
