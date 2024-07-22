import { useRef, useState } from 'react';
import { useInfo } from '../../context/useInfo';

export default function () {
  const { info, fetchWeb, setError } = useInfo();

  if (info?.permissions.admin == 0) return <center className="loading">
    <img src="/images/monitor/monitor_red.png" alt="monitor" />
    <span>You don't have enough permissions to access this page.</span>
  </center>

  const uploadImageRef = useRef();

  const [blobData, setBlobData] = useState(null)

  const createBadge = async () => {
    const response = await fetchWeb('/gallery/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg'
      },
      data: blobData
    }, false)
  }

  const uploadProfile = async () => {
    if (uploadImageRef.current == null) return;
    const files = uploadImageRef.current.files;
    console.log("files:", files)

    if (files == null || files[0] == null) return;

    console.log("original:", files[0].size)

    var reader = new FileReader();
    reader.onload = function (e) {
      var image = new Image();
      image.src = reader.result;

      image.onload = function () {
        var canvas = document.createElement("canvas");
        const biggestSide = Math.max(image.height, image.width);
        const smallestSide = Math.min(image.height, image.width);
        // canvas.width = image.width
        // canvas.height = image.height

        const resizeFactor = Math.min(512, smallestSide, biggestSide / 2);

        if (biggestSide == image.height) {
          const newSide = resizeFactor / (image.height / image.width); // resizeFactor / height factor
          canvas.width = String(newSide);
          canvas.height = String(resizeFactor);
        } else {
          const newSide = resizeFactor / (image.width / image.height); // resizeFactor / width ratio
          canvas.width = String(resizeFactor);
          canvas.height = String(newSide);
        }


        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL("image/png");

        canvas.toBlob(blob => {
          console.log("BLOB:", blob)
          console.log(blob.size)
          setBlobData(blob)
        }, "image/jpeg")

        // max length should be 5000?
        console.log("from", reader.result.length, "to", dataURL.length)

        // setBadgeData({ ...badgeData, "image": dataURL })
      }
    }
    reader.readAsDataURL(files[0]);
  }

  return <main className="test basic">
    <h2>Blob test</h2>
    <img src={blobData} alt="preview image" />
    <hr />
    <label>
      image
      <input type="file" ref={uploadImageRef} onChange={(e) => uploadProfile(e)} />
    </label>

    <input type="submit" value="Upload" onClick={() => createBadge()} />
  </main>
}