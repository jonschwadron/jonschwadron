import { Mongo } from 'meteor/mongo';

export const Expenses = new Mongo.Collection('expenses');

console.log("expenses.js loaded");
