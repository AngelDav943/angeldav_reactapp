import React, { useEffect, useState } from 'react'
import { useInfo } from '../../context/useInfo';

import utils from '../../utils';

export default function () {
  const [body, setBody] = useState("");
  const [parsedBody, setParsedBody] = useState();

  useEffect(() => {
    setParsedBody(utils.parseMarkdown(body))
  }, [body])

  return <article className='markdowntest'>
    <section>
      <h2>Markdown parse test</h2>
      <label>
        Content
        <textarea name="" id="" cols="30" onChange={(e) => { setBody(e.target.value) }} />
      </label>
    </section>
    <div id='parsedBody' dangerouslySetInnerHTML={{__html: parsedBody}}>
    </div>
  </article>
}
