import React from 'react'
import style from './Brands.module.css'
import {Helmet} from "react-helmet";
import RecentBrand from '../RecentBrand/RecentBrand';

export default function Brands() {
  return<>

<Helmet>
      <title>Brands</title>
</Helmet>
<RecentBrand/>
  </>
}
