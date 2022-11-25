import React from 'react'
import {data} from '../data.js'
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Myimg} from './Myimg'


export const Product=()=> {
    const params = useParams()
    console.log('url paramater:',params)
    const selProduct=data.find(obj=>obj.id==params.id)
    console.log(selProduct)
    const navigate=useNavigate()

  return (
    <div>
        <Card style={{ width: '18rem' }}>
            <Myimg selProduct={selProduct}/>
      {/*<Card.Img variant="top" src={selProduct.imgUrl} />*/}
      <Card.Body>
        <Card.Title>{selProduct.name}</Card.Title>
        <Card.Text>
          Price:{selProduct.price}
        </Card.Text>
        <Button variant="primary"onClick={()=>navigate('/products')}>Back to all products</Button>
      </Card.Body>
    </Card>
    </div>
  )
}
