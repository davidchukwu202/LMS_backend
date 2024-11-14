const {model, Schema, default: mongoose} = require('mongoose');

/***
title,
description,
instructor,
duration,
language,
price;
These attributes are the required items.
 */
const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'The course title is neede before operation',],
    },
    description: {
        type: String,
        required: [true, "create a brief decription"],
    },
    instructor: {
        type: String,
        required: [true, 'Every course must have a teacher'],
    },
    duration: {
        type: Number,
        required: [true, "Please set the duration of the course",],
    },
    level: {
        type: String,
        default: 'beginner',
    },
    prerequities: {
        type: Array,
        default: [],
    },
    language: {
        type: Array,
        required: [true, "set the languages of the course"],
    },
    price: {
        type: String,
        required: [true, 'Pricing must be set, can be updated later'],
    },
    enroll_limit: {
        type: Number,
        default: 100,
    },
    status: {
        type: Array,
        default: [],
    },
    resources: {
        type: Array,
        default: [],
    },
    assessments: {
        type: Array,
        // required: [],
        default: [],
    },
    visibility: {
        type: String,
        default: 'Tier 1',
    },
    rating: {
        type: Number,
        default: null,
    },
    category: {
        type: String,
        required: [true, 'Select a category for a course'],
    }

});

module.exports = new model('Course', courseSchema);