const express = require("express");
const router = express.Router();
const axios = require('axios');
const { 직업각인함수 } = require('./class');
const { 악세옵션목록분석 , 보석검사 } = require("./optionsearch");

const HTML태그제거 = (input) => input.replace(/<[^>]*>/g, '');

const 무기레벨추출함수 = (input) => {
  const match = input.match(/\b\d{4}\b/);
  return match ? match[0] : null;
};

router.post('/', async(req, res) => {

  const nickname = req.body.nickname // 여기부분에 그냥 닉네임 적거나 postman body에 raw 에 이런방식으로 넣으면 테스트 가능 { "nickname": "HaeSung99" }
    
  const response = await axios.get('https://developer-lostark.game.onstove.com/armories/characters/'+nickname+'', {
    headers: {
        'accept': 'application/json',
        'authorization': process.env.lostark_api_key || 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNTcxNTUifQ.I1pGqN--4PJ_WTIzJa02FhWr3oDgcp0zgCoQ3lLlmgF1wRFAE7lcj1X7A-WowS5qQDiHR1m_05qdhB8MM1wjgHHYzwyXjrFAmclypz73pjswfHHcLB7O5JWtaW7um22c3vVUtvq1AHJ38XCeT4K32qXsdIpQohbP_nCe2hEfazM7lf0zESfQnwjNyGp5oeGT9-E06h1GV4NAa_7Pc64ThhPUJUXi-gPqm6tuPfxpV75tWT8BERo5-8QuOswe-jvFgylLYSrbpJHqXRQn75rjJeZWQjcZdP0GZIRme9GFZ4WrsvVbpWapzM7ET5jpi4GTgUQp5VkZMvQWv3OaICiuzQ'
    }
  });
  
  직업각인 = 직업각인함수(JSON.parse(response.data.ArkPassive.Effects[0].ToolTip).Element_000.value)
  무기정보 = 무기레벨추출함수(HTML태그제거(JSON.parse(response.data.ArmoryEquipment[0].Tooltip).Element_001.value.leftStr2)) // 무기레벨(1710레벨) 을 보여줄까 무기몇강인지 보여줄까 ( ex +20[20] 품질 99 )
  악세옵션 = 악세옵션목록분석(response);
  보석 = 보석검사(response)
  //console.log(HTML태그제거(JSON.parse(response.data.ArmoryGem.Gems[0].Tooltip).Element_000.value))
  res.json({ 
      무기레벨 : 무기정보,
      직업각인 : 직업각인,
      악세목록 : 악세옵션,
      보석 : 보석
     }); // Express 서버가 반환하는 JSON
  });

  module.exports = router;