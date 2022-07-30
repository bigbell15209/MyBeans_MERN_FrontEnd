import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import { Button, Card, Col, Row, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setLocalUserLogin } from "../features/authSlice"

function Home() {
	

	return (
		<div>
			<br></br><br></br>
			<h2> MyBeans_MERN</h2>
			<br></br>
			<h3> 포트폴리오</h3>
			<h4>- Eunbee Lee</h4>
			<h4>- Jihyeok Kim</h4>
		</div>
	)
}

export default Home
