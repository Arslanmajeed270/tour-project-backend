# Apis flow
Api flow from frontend

## Api for home page
**endpoint:** /home

**type:**: get

**response:**
```JSON [
 {
        "discountedTours": [
            {
                "id":1,
                "image": "/assets/img/api_images/tour1.jpeg",
                "title":"Trip to Malam Jaba",
                "location":"Malam Jabba",
                "description":"this is demo 1",
                "departure": "Sun Feb 28 2021 11:49:37 GMT+0500 (Pakistan Standard Time)", 
                "returning": "Thu Mar 04 2021 11:49:37 GMT+0500 (Pakistan Standard Time)",
                "price":12000,
                "discountPrice": 7000,
                "totalDays": 4, 
                "rating": 4.3,
                "specialOffer": false
            }
        ],
        "tours": [ 
            {
                "id":23,
                "image": "/assets/img/api_images/tour12.jpg",
                "title":"Trip to Malam Jaba",
                "location":"Malam Jabba",
                "description":"this is demo 1",
                "departure": "Sun Feb 28 2021 11:49:37 GMT+0500 (Pakistan Standard Time)", 
                "returning": "Thu Mar 04 2021 11:49:37 GMT+0500 (Pakistan Standard Time)",
                "price":12000,
                "totalDays": 4, 
                "rating": 4.3
            }
        ]
    }
]
```

## Api for all tours page
**endpoint:** /tours

**type:**: post

**reqPacket:**
```JSON
{
    "offset": offset,
    "departure": "",
    "minPrice": 0,
    "maxPrice": 0,
    "name": "",
    "location": "",
    "locationFrom": "",
    "travelType": "",
    "returnDate": "",
}
```

**response:**
```JSON
{
    "status":"success",
    "data": {
        "totalPages":3,
        "offset":0,
        "tours": [
            {
                "id":31,
                "image": "/assets/img/api_images/tour1.jpeg",
                "title":"Trip to Malam Jaba",
                "location":"Malam Jabba",
                "description":"this is demo 1",
                "departure": "Sun Feb 28 2021 11:49:37 GMT+0500 (Pakistan Standard Time)", 
                "returning": "Thu Mar 04 2021 11:49:37 GMT+0500 (Pakistan Standard Time)",
                "price":12000,
                "totalDays": 4, 
                "rating": 4.3,
            }
        ]
    }
}
```


## Api for tour detail page
**endpoint:** /single-tour/:31

**type:**: get


**response:**
```JSON
{
        "tour":
        {
            "id":31,
            "images": [
                "/assets/img/api_images/tour1.jpeg",
                "/assets/img/api_images/tour2.jpg",
                "/assets/img/api_images/tour3.jpg",
                "/assets/img/api_images/tour4.jpg",
                "/assets/img/api_images/tour5.jpg",
                "/assets/img/api_images/tour6.jpg"
            ],
            "title":"Trip to Malam Jaba",
            "location":"Malam Jabba",
            "description":"this is demo 1",
            "departure": "Sun Feb 28 2021 11:49:37 GMT+0500 (Pakistan Standard Time)", 
            "returning": "Thu Mar 04 2021 11:49:37 GMT+0500 (Pakistan Standard Time)",
            "price":12000,
            "totalDays": 4, 
            "rating": 2.1,
            "allowedPersons":4,
            "users":{
                "id":"",
                "name":"",
                "phoneNumber":"",
                "email":""
            },
            "tags": [
                "Adventure",
                "Travel",
                "Nature",
                "Malam Jabba"
            ],
             "included": [
                    {
                        "name": "food",
                        "status": true,
                        "detail": ""
                    }
                ],
                "plan": [
                    {
                        "day": 1,
                        "title": "",
                        "image":"",
                        "detail": ""
                        },
                    }
                ],
                "agency": {
                    "id":"",
                    "image": "",
                    "title": "",
                    "description": "",
                    "contactNumber": "",

                },
                "location":{
                    "longitude": 24234,
                    "latitude": 234
                },
                "reviews": [
                    {
                        "id":13224,
                        "name": "arslna",
                        "createdAt": "",
                        "rating": 4.3,
                        "text": "sfdsfs"
                    }
                ]
        }
    }
```


## Api for tour detail page
**endpoint:** /add-review

**type:**: post

**reqPacket:**
```JSON
{
    "id": 32,
    "name": "",
    "email": "",
    "text": "",
    "rating": 4.3
}
```

**response:**
```JSON
"status":"Success"
```



## Api for tour detail page
**endpoint:** /book-tour

**type:**: post

**reqPacket:**
```JSON
{
    "id": 32,
    "name": "",
    "email": "",
    "phone":"",
    "cnic":"",
    "cnicImage": file: [],
    "message":"",
    "tourId": 234
}
```

**response:**
```JSON
"status":"Success"
```

## Api for contact us page
**endpoint:** /contact-us

**type:**: post

**reqPacket:**
```JSON
{
    "id": 32,
    "name": "",
    "email": "",
    "phoneNumber":"",
    "message":""
}
```

**response:**
```JSON
"status":"Success"
```
