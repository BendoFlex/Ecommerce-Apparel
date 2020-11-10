const routes= {
    users: [
        'POST:/user/create', //fait
        'POST:/user/signin', //fait
        'GET:/user/logout',
        'GET:/users'
    ],
    products: {
        opened: [
            'GET:api/v1/products', //fait
            'GET:api/v1/products/:productId', //fait
            'GET:api/v1/products/:search',
            'GET:api/v1/products/:productId/related', //fait
            'GET:api/v1/products/dev/categories', //fait
            'GET:api/v1/products/dev/products', //fait
            'GET:api/v1/products/categories/:categoryId',
        ],
        protected: [
            'POST||UPDATE||DELETE:api/v1/products/protected/:controller/:action/:userId', //fait


            /*Ex: 'PUT:api/v1/protected/products/update/:productId/:userId',
            'DELETE:api/v1/protected/products/delete/:productId/:userId'*/
        ]
    },
}

module.exports= routes;