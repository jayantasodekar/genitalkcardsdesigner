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

export const defaultPayload: string = `{
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "TextBlock",
            "size": "Medium",
            "weight": "Bolder",
            "text": "Publish Adaptive Card schema"
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
                            "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
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
                            "text": "Matt Hidinger",
                            "wrap": true
                        },
                        {
                            "type": "TextBlock",
                            "spacing": "None",
                            "text": "Created {{DATE(2017-02-14T06:08:39Z,SHORT)}}",
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
            "text": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
            "wrap": true
        },
        {
            "type": "FactSet",
            "facts": [
                {
                    "title": "Board:",
                    "value": "Adaptive Card"
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
                        "type": "Action.OpenUrl",
                        "title": "OK",
                        "url": "http://adaptivecards.io"
                    }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
            }
        },
        {
            "type": "Action.OpenUrl",
            "title": "View",
            "url": "http://adaptivecards.io"
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.0"
}`;

export const defaultTemplatePayload: string = `{
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
    "title": "Publish Adaptive Card Schema",
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