const fs = require('fs');
const inquirer = require('inquirer');
const express = require("express");
const mysql = require('mysql');

const app = express();

const PORT = process.env.PORT || 789;


