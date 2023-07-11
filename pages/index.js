import Head from 'next/head';
import SearchBar from "../components/searchBar"
import ProductList from '../components/productList';
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home({props}) {
  const [filter, setFilter] = useState("")
  const { data, error, isLoading } = useSWR('https://raw.githubusercontent.com/saltedfishclub/FileStorage/master/fruits.json', fetcher)
  if (data) {
    return (
      <>
        <SearchBar setFilter={setFilter} />
        <ProductList products={data} filter={filter} />
      </>
    )
  }else if(error){
      return <p>Sorry, we can't load our products in this time, please try again later.</p>
  }else if(isLoading){
    return <p>Loading... Please wait..</p>
  }
}