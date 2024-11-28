const express = require("express");
const router = express.Router();
const axios = require('axios');


router.post('/', async(req, res) => {

  const nickname = 'haesung99' // 여기부분에 req.body 넣을예정임 지금은 개발중
    
  const response = await axios.get('https://developer-lostark.game.onstove.com/armories/characters/'+nickname+'', {
    headers: {
        'accept': 'application/json',
        'authorization': process.env.lostark_api_key || 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNTcxNTUifQ.I1pGqN--4PJ_WTIzJa02FhWr3oDgcp0zgCoQ3lLlmgF1wRFAE7lcj1X7A-WowS5qQDiHR1m_05qdhB8MM1wjgHHYzwyXjrFAmclypz73pjswfHHcLB7O5JWtaW7um22c3vVUtvq1AHJ38XCeT4K32qXsdIpQohbP_nCe2hEfazM7lf0zESfQnwjNyGp5oeGT9-E06h1GV4NAa_7Pc64ThhPUJUXi-gPqm6tuPfxpV75tWT8BERo5-8QuOswe-jvFgylLYSrbpJHqXRQn75rjJeZWQjcZdP0GZIRme9GFZ4WrsvVbpWapzM7ET5jpi4GTgUQp5VkZMvQWv3OaICiuzQ'
    }
  });
  
  직업각인 = JSON.parse(response.data.ArkPassive.Effects[3].ToolTip).Element_000.value
  console.log(직업각인)

    res.json({ name: 직업각인 }); // Express 서버가 반환하는 JSON
  });

  module.exports = router;