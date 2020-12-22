// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
export const otherTestPayload: string = `{
	"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
	"type": "AdaptiveCard",
	"version": "1.0",
	"body": [
		{
			"type": "ActionSet",
			"actions": [
				{
					"type": "Action.ShowCard",
					"title": "Set due date",
					"card": {
						"type": "AdaptiveCard",
						"body": [
							{
								"type": "Input.Date",
								"id": "dueDate",
								"title": "Select due date"
							},
							{
								"type": "Input.Text",
								"id": "comment",
								"isMultiline": true,
								"placeholder": "Add a comment"
							}
						],
						"actions": [
							{
								"type": "Action.OpenUrl",
								"title": "OK",
								"url": "https://adaptivecards.io"
							}
						]
					}
				},
				{
					"type": "Action.OpenUrl",
					"title": "View",
					"url": "https://adaptivecards.io"
				}
			]
		}
	]
}`;

export const defaultPayload1: string = `{
    "type": "GenietalkCard",
    "version": "1.0",
    "body": [
    {
"type": "Carousel",
"displayitemcount":2,
"carouselitems": [
    {
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },
    {
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },
    
    {
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },
    {
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },
    {
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    }
]
},
{
"type": "Carousel",
"displayitemcount":2,
"carouselitems": [
    {
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },
    {
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },
    
    {
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },
    {
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },
    {
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    }
]
},
    {
            "type": "Image",
            "url": "https://genietalkcards.io/content/genietalk-card-50.png"
        },
        {
            "type": "TextBlock",
            "text": "Hello **Genietalk Cards!**"
        }
        
    ],
    "actions": [{
            "type": "Action.OpenUrl",
            "title": "Learn more",
            "url": "https://genietalkcards.io"
        },
        {
            "type": "Action.OpenUrl",
            "title": "GitHub",
            "url": "https://github.com/Microsoft/GenietalkCards"
        }
        ,
        {
            "type": "Action.SubmitQuery",
            "title": "SubmitQuery",
            "query": "hello"
        }
    ]
}`;
export const defaultPayload: string = `{
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.0",
    "body": [
        {
            "type": "TextBlock",
            "text": "Publish Adaptive Card Schema",
            "weight": "bolder",
            "size": "medium",
            "wrap": true
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "width": "auto",
                    "items": [
                        {
                            "type": "Image",
                            "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                            "size": "small",
                            "style": "person"
                        }
                    ]
                },
                {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "Matt Hidinger",
                            "weight": "bolder",
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "spacing": "none",
                            "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                            "isSubtle": true,
                            "wrap": true
                        }
                    ]
                }
            ]
        },
        {
            "type": "TextBlock",
            "text": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
            "wrap": true
        },
        {
            "type": "FactSet",
            "facts": [
                {
                    "title": "Board:",
                    "value": "Adaptive Cards"
                },
                {
                    "title": "List:",
                    "value": "Backlog"
                },
                {
                    "title": "Assigned to:",
                    "value": "Matt Hidinger"
                },
                {
                    "title": "Due date:",
                    "value": "Not set"
                }
            ]
        }
    ],
    "actions": [
        {
            "type": "Action.ShowCard",
            "title": "Set due date",
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "Input.Date",
                        "id": "dueDate"
                    },
                    {
                        "type": "Input.Text",
                        "id": "comment",
                        "placeholder": "Add a comment",
                        "isMultiline": true
                    }
                ],
                "actions": [
                    {
                        "type": "Action.Submit",
                        "title": "OK"
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.OpenUrl",
            "title": "View",
            "url": "https://adaptivecards.io"
        }
    ]
}
`;
export const defaultTemplatePayload: string = `{
    "type": "GenietalkCard",
    "version": "1.0",
    "body": [
    {
"type": "Carousel",
"displayitemcount":2,
"carouselitems": [
    {
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },
    {
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },
    
    {
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },
    {
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },
    {
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    }
]
},
{
"type": "Carousel",
"displayitemcount":2,
"carouselitems": [
    {
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },
    {
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },{
        "type": "CarouselItem",
        "width": "auto",
        "items": [
            {
                "type": "Image",
                "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                "size": "small",
                "style": "person"
            }
        ]
    },
    
    {
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },
    {
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    },
    {
        "type": "CarouselItem",
        "width": "stretch",
        "items": [
            {
                "type": "TextBlock",
                "text": "Matt Hidinger",
                "weight": "bolder",
                "wrap": true
            },
            {
                "type": "TextBlock",
                "spacing": "none",
                "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                "isSubtle": true,
                "wrap": true
            }
        ]
    }
]
},
    {
            "type": "Image",
            "url": "https://genietalkcards.io/content/genietalk-card-50.png"
        },
        {
            "type": "TextBlock",
            "text": "Hello **Genietalk Cards!**"
        }
        
    ],
    "actions": [{
            "type": "Action.OpenUrl",
            "title": "Learn more",
            "url": "https://genietalkcards.io"
        },
        {
            "type": "Action.OpenUrl",
            "title": "GitHub",
            "url": "https://github.com/Microsoft/GenietalkCards"
        }
        ,
        {
            "type": "Action.SubmitQuery",
            "title": "SubmitQuery",
            "query": "hello"
        }
    ]
}`;

export const defaultTemplatePayload1: string = `{
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "Container",
            "items": [
                {
                    "type": "TextBlock",
                    "text": "This example uses [Adaptive Card Templating](https://docs.microsoft.com/en-us/adaptive-cards/templating/) *(Preview)*",
                    "size": "Medium",
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": "Click the **Preview mode** toolbar button to see the card bound to the **Sample Data** in the lower-right. Sample Data helps design your card by simulating the real data.",
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": "When you're ready to populate it with real data, use the Adaptive Card [templating SDKs](https://docs.microsoft.com/en-us/adaptive-cards/templating/sdk).",
                    "wrap": true
                }
            ],
            "style": "good",
            "bleed": true
        },
        {
            "type": "TextBlock",
            "size": "Medium",
            "weight": "Bolder",
            "text": "{title}"
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "Image",
                            "style": "Person",
                            "url": "{creator.profileImage}",
                            "size": "Small"
                        }
                    ],
                    "width": "auto"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "weight": "Bolder",
                            "text": "{creator.name}",
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "spacing": "None",
                            "text": "Created {{DATE({createdUtc},SHORT)}}",
                            "isSubtle": true,
                            "wrap": true
                        }
                    ],
                    "width": "stretch"
                }
            ]
        },
        {
            "type": "TextBlock",
            "text": "{description}",
            "wrap": true
        },
        {
            "type": "FactSet",
            "facts": [
                {
                    "$data": "{properties}",
                    "title": "{key}:",
                    "value": "{value}"
                }
            ]
        }
    ],
    "actions": [
        {
            "type": "Action.ShowCard",
            "title": "Set due date",
            "card": {
                "type": "AdaptiveCard",
                "body": [
                    {
                        "type": "Input.Date",
                        "id": "dueDate"
                    },
                    {
                        "type": "Input.Text",
                        "id": "comment",
                        "placeholder": "Add a comment",
                        "isMultiline": true
                    }
                ],
                "actions": [
                    {
                        "type": "Action.Submit",
                        "title": "OK"
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.OpenUrl",
            "title": "View",
            "url": "{viewUrl}"
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.0"
}`;

export const defaultDataPayload: string = `{
    "title": "Publish Adaptive Card Schema11",
    "description": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
    "creator": {
        "name": "Matt Hidinger",
        "profileImage": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg"
    },
    "createdUtc": "2017-02-14T06:08:39Z",
    "viewUrl": "https://adaptivecards.io",
    "properties": [
        { "key": "Board", "value": "Adaptive Cards" },
        { "key": "List", "value": "Backlog" },
        { "key": "Assigned to", "value": "Matt Hidinger" },
        { "key": "Due date", "value": "Not set" }
    ]
}`

export const carousel: String = `{
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "Container",
            "items": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "auto",
                            "items": [
                                {
                                    "type": "Input.ChoiceSet",
                                    "id": "PlanID",
                                    "style": "expanded",
                                    "value": "1",
                                    "choices": [
                                        {
                                            "title": " ",
                                            "value": "1"
                                        }
                                    ]
                                }
                            ],
                            "verticalContentAlignment": "Center"
                        },
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Truly Unlimited Calls",
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "₹449",
                                    "spacing": "Small",
                                    "weight": "Bolder"
                                }
                            ],
                            "separator": true,
                            "backgroundImage": {},
                            "width": 2
                        },
                        {
                            "type": "Column",
                            "width": 1,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Benifits",
                                    "isSubtle": true,
                                    "horizontalAlignment": "Center"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "2GB/day",
                                    "weight": "Bolder",
                                    "horizontalAlignment": "Center",
                                    "spacing": "Small"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": 1,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Validity",
                                    "isSubtle": true,
                                    "horizontalAlignment": "Right"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "56 days",
                                    "horizontalAlignment": "Right",
                                    "weight": "Bolder",
                                    "spacing": "Small"
                                }
                            ]
                        }
                    ]
                },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "selectAction": {
                        "type": "Action.ToggleVisibility",
                        "targetElements": [
                            "cardContent4",
                            "showHistory",
                            "hideHistory"
                        ]
                    },
                    "verticalContentAlignment": "Center",
                    "items": [
                        {
                            "type": "TextBlock",
                            "id": "showHistory",
                            "horizontalAlignment": "Right",
                            "color": "Accent",
                            "text": "Show more",
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "id": "hideHistory",
                            "horizontalAlignment": "Right",
                            "color": "Accent",
                            "text": "Show less",
                            "wrap": true,
                            "isVisible": false
                        }
                    ],
                    "width": 1
                }
            ]
        },
        {
            "type": "Container",
            "id": "cardContent4",
            "isVisible": false,
            "items": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "* Expense submitted by **Matt Hidinger** on Mon, Jul 15, 2019",
                            "isSubtle": true,
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "text": "* Expense approved by **Thomas** on Mon, Jul 15, 2019",
                            "isSubtle": true,
                            "wrap": true
                        }
                    ]
                }
            ]
        }
            ]
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.3",
    "fallbackText": "This card requires Adaptive Cards v1.2 support to be rendered properly."
}`