import loadingImg from '../assets/circle.png'

function Loading({className,visible}:any) {
  return (
    visible&&
    <div className={className+" animate-spin"}>
        <img src={loadingImg} alt=""/>
    </div>
  )
}

export default Loading