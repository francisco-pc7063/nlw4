import { useRouter } from "next/router"


function About() {
const router = useRouter()

const data = router.query
console.log(data)
/*
data will include the [someProp] value but not the ?foo=bar query param
*/

return <div>my content: {data}</div>
}

About.getInitialProps = async ({query}) => {
    console.log(query.pid)

return { pid: query.pid }
}

export default About