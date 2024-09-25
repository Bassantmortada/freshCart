import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import RecentCategories from '../RecentCategories/RecentCategories'
import {Helmet} from "react-helmet";

export default function Categories() {
return<>
<Helmet>
    <title>Categories</title>
</Helmet>

<RecentCategories/>
</>
}
