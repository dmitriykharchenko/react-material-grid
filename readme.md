## React Material Grid

The grid from [material.angular](https://material.angularjs.org/1.0.0/layout/introduction) wrapped for `React`.

```
  npm install react-material-grid --save
```
It have angular-material in peer dependencies.



### Docs

Everything you need is on [material.angularjs.org/1.0.0/layout/introduction](https://material.angularjs.org/1.0.0/layout/introduction)

### Example


```javascript
  import Grid from 'react-material-grid'


  export default (props) => {
    return (
      <Grid layout="row" layoutAlign="center center">
        <Grid flexSm={ 100 } flex={ 50 }>
          Hello here
        <Grid>
        <Grid flexSm={ 100 } flex={ 50 }>
          Hello here too!
        <Grid>
      </Grid>
    )
  }

```


And if you need some specific component in your grid:

```javascript
  import Grid from 'react-material-grid'
  import {
    SomeComponent,
    OtherComponent
  } from 'components'


  export default (props) => {
    return (
      <Grid component={ section } layout="row" layoutAlign="center center">
        <Grid component={ SomeComponent } flexSm={ 100 } flex={ 50 }>
          Hello here
        <Grid>
        <Grid  component={ OtherComponent } flexSm={ 100 } flex={ 50 }>
          Hello here too!
        <Grid>
      </Grid>
    )
  }

```
