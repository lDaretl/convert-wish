import {List} from '@mui/material';
import {ProductsListItem} from './ProductsListItem'

export const ProductsList = ({products, handlerSave}) => {
    return (
        <List component="nav"
              aria-labelledby="nested-list-subheader"
              sx={{
                  p: 1,
                  position: 'relative',
                  zIndex: 50,
                  width: '100%'
              }}
        >
            {
                products.map((product, id) =>
                    <ProductsListItem
                        key={id}
                        product={product}
                        id={id}
                        handlerSave={handlerSave}
                        delay={(products.length - id) * 40}
                    />
                )
            }
        </List>
    )
}

