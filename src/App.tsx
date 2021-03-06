import React, { useEffect, useState } from 'react';
import './App.css';
import XLSX from 'xlsx';
import axios from 'axios';
import { forEachChild } from 'typescript';

function App() {

  const[naselja,setNaselja] = useState([]);
  const[anketaPrazna,setAnketaPrazna] = useState({});
  const[broj,setBroj] = useState(0)

  useEffect(()=>{
    axios.get("http://192.168.0.180:9000/get/naselja")
    .then(res =>{
      setNaselja(res.data)
    })
  },[])

  var zupanije = [
    {
      naziv: "ZAGREBAČKA",
      id:1
    },
    {
      naziv: "KRAPINSKO-ZAGORSKA",
      id:2
    },
    {
      naziv: "SISAČKO-MOSLAVAČKA",
      id:3
    },
    {
      naziv: "KARLOVAČKA",
      id:4
    },
    {
      naziv: "VARAŽDINSKA",
      id:5
    },
    {
      naziv: "KOPRIVNIČKO-KRIŽEVAČKA",
      id:6
    },
    {
      naziv: "BJELOVARSKO-BILOGORSKA",
      id:7
    },
    {
      naziv: "PRIMORSKO-GORANSKA",
      id:8
    },
    {
      naziv: "LIČKO-SENJSKA",
      id:9
    },
    {
      naziv: "VIROVITIČKO-PODRAVSKA",
      id:10
    },
    {
      naziv: "POŽEŠKO-SLAVONSKA",
      id:11
    },
    {
      naziv: "BRODSKO-POSAVSKA",
      id:12
    },
    {
      naziv: "ZADARSKA",
      id:13
    },
    {
      naziv: "OSJEČKO-BARANJSKA",
      id:14
    },
    {
      naziv: "ŠIBENSKO-KNINSKA",
      id:15
    },
    {
      naziv: "VUKOVARSKO-SRIJEMSKA",
      id:16
    },
    {
      naziv: "SPLITSKO-DALMATINSKA",
      id:17
    },
    {
      naziv: "ISTARSKA",
      id:18
    },
    {
      naziv: "DUBROVAČKO-NERETVANSKA",
      id:19
    },
    {
      naziv: "MEĐIMURSKA",
      id:20
    },
    {
      naziv: "GRAD ZAGREB",
      id:21
    },
  ]

  var selectedFile :any
  var excel :any
  var doneConvert :boolean = false
  interface anketa {
    ORTOPEDSKA_POMAGALA:[],
    PKZ3_PKZ4:[{
      IME_PREZIME:string | null,
      GOD_RODENJA:number | null,
      SRODSTVO:string | null,
      RAZINA_OBRAZOVANJA:number | null,
      STRANI_JEZIK:any[],
      MS_WORD:number | null,
      MS_EXCEL:number | null,
      MS_POWERPOINT:number | null,
      MS_ACCESS: number | null,
      SLUZENJE_INTERNETOM:number | null,
      SLUZENJE_EMAILOM:number | null,
      DODATNE_RACUNALNE:any[],
      CERTIFIKATI:any[],
      VOZACKI:number | null,
      DODATNE_VJESTINE:any[],
      KRONICNA_BOLEST:string | null,
      WHO1:number | null,
      WHO2:number | null,
      WHO3:number | null,
      WHO4:number | null,
      WHO5:number | null,
      WHO6:number | null,
      WHO7:number | null,
      WHO8:number | null,
      WHO9:number | null,
      WHO10:number | null,
      WHO11:number | null,
      WHO12:number | null,
      WHO_2:number | null,
      WHO_3:number | null,
      WHO_4:number | null,
      DASS21_1:number | null,
      DASS21_2:number | null,
      DASS21_3:number | null,
      DASS21_4:number | null,
      DASS21_5:number | null,
      DASS21_6:number | null,
      DASS21_7:number | null,
      DASS21_8:number | null,
      DASS21_9:number | null,
      DASS21_10:number | null,
      DASS21_11:number | null,
      DASS21_12:number | null,
      DASS21_13:number | null,
      DASS21_14:number | null,
      DASS21_15:number | null,
      DASS21_16:number | null,
      DASS21_17:number | null,
      DASS21_18:number | null,
      DASS21_19:number | null,
      DASS21_20:number | null,
      DASS21_21:number | null,
      STR1:number | null,
      STR2_1:number | null,
      STR2_2:number | null,
      STR2_3:number | null,
      STR2_4:number | null,
      STR2_5:number | null,
      ZNANJE:any[],
      TRENUTNI_RADNI_STATUS_ID:number | null,
      TRENUTNO_ZANIMANJE_ID:number | null,
      PODJELA_ZANIMANJA_ID:string | null,
      PRIJAVLJEN_HZZO_ID:number | null,
      PRIJAVLJEN_HZZO_RAZLOG_ID:number | null,
      HZZO_BROJ_MJESECI:number | null,
      TRAZIO_POSAO_ID:number | null,
      TRAZIO_POSAO_BROJ_PUTA:number | null,
      POSLODAVCI:[],
      ISHOD_ZADNJEG_OBRACANJA_POSLODAVCU_ID:number | null,
      RAZLOG_NEOBRACANJA_POSLODAVCU_ID:number | null,
      KATEGORIJA_POSLOVA_ZELJELI_ID:string | null,
      ZUPANIJA_ZELJELI_RADITI_ID:number | null,
      NASELJE_ZELJELI_RADITI_ID:number | null,
      PREKVALIFIKACIJA_ID:number | null,
      PITANJE_5P11B_ID:null,
      NEZAINTERESIRAN_PREKVALIFIKACIJA_ID:string | null,
      NAZIV_TVRTKE:string | null,
      NAZIV_MJESTA_TVRTKE:number | null,
      NAZIV_ULICE_TVRTKE:string | null,
      KUCNI_BROJ_TVRTKE:string | null,
      RADILI_STRUCI_ID:number | null,
      NAZIV_STRUKE_ID:string | null,
      IZNOS_PLACE_ID:number | null,
      UKUPNO_PRIMANJA_ID:number | null,
      UGOVOR_O_DOZIVOTNOM_UZDRZAVANJU_ID:number | null,
      OSOBA_PRIMATE_UZDRZAVANJE_ID:number | null,
      IZNOS_UZDRZAVANJA_ID:number | null,
      DOZIVOTNO_UZDRZAVANJE_DAVATELJ_ID:number | null,
      BROJ_OSOBA_UZDRZAVATE:number | null,
      UZDRZAVANE_OSOBE:[]
  }],
  PKZ5:[],
  PROGRAM_PSIHOPOMOCI:[],
  IME_ZRTVE:string | null,
  PREZIME_ZRTVE:string | null,
  OIB:number | null,
  SPOL:number | null,
  DATUM_RODENJA:Date | null,
  NASELJE_RODENJA:number | null,
  ZUPANIJA_RODENJA:number | null,
  DRZAVA_RODENJA:string | null,
  DRZAVLJANSTVO:string | null,
  PREBIVALISTE:number | null,
  BORAVISTE:number | null,
  POSTANSKI_BROJ:number | null,
  ULICA_STANOVANJA:string | null,
  FIKSNI:string | null,
  MOBILNI:string | null,
  EMAIL:string | null,
  BRACNO_STANJE:number | null,
  ZUPANIJA_PREBIVALISTA:number | null,
  F1_ID:number | null,
  F2_ID:number | null,
  IME_PREZIME_ISPUNJAVA:string | null,
  GOD_RODJENJA_ISPUNJAVA:number | null,
  SRODSTVO_ID:number | null,
  BROJ_OSOBA_U_KUCANSTVU:number | null,
  POSTOJE_UZDRZAVANE_OSOBE:number | null,
  BROJ_UZDRZAVANIH_OSOBA:number | null,
  ZUPANIJA_STRADAVANJA_ID:number | null,
  NASELJE_STRADAVANJA_ID:number | null,
  LOKACIJA_STRADAVANJA_ID:string | null,
  PODRUCJE_STRADAVANJA_ID:string | null,
  DAN_STRADAVANJA:number | null,
  MJESEC_STRADAVANJA:number | null,
  GODINA_STRADAVANJA:number | null,
  VRSTA_STRADAVANJA_ID:string | null,
  VRSTA_EKSPLOZIVNOG_SREDSTVA_ID:number | null,
  NAZIV_EKS:string | null,
  OZNAKA_EKS:string | null,
  STUPANJ_TJELESNOG_OSTECENJA_ID:number | null,
  DODATNI_OPIS_OZLJEDE:string | null,
  ZDRAVSTVENO_STANJE_PROMJENE_ID:number | null,
  ZDRAVSTVENO_STANJE_PROMJENE_OPIS:string | null,
  DIJAGNOZA_ID:string | null,
  VRSTA_ZANIMANJA_ID:string | null,
  MJESTO_STRADAVANJA_SUMNJIVO_ID:number | null,
  POSTUPAK_NAKNADA_STETE_ID:number | null,
  POSTUPAK_NAKNADA_STETE_NACIN_ID:number | null,
  FAZA_NAKNADE_STETE_ID:number | null,
  ISHOD_POSTUPKA_NAKNADE_STETE_ID:number | null,
  POSTUPAK_RADNE_SPOSOBNOSTI_ID:number | null,
  OCJENA_RADNE_SPOSOBNOSTI_ID:number | null,
  POTREBNA_TUDJA_POMOC_ID:number | null,
  POMOC_DRUGE_OSOBE_SASTOJI:string | null,
  TJEDNO_SATI_POMOC_ID:number | null,
  KORISNIK_DOPLATKA_ZA_POMOC_ID:number | null,
  KORISTITE_ORTOPEDSKO_POMAGALO_ID:number | null,
  PRAVO_PROFESIONALNE_REHABILITACIJE_ID:number | null,
  KAKVO_PRAVO_PROFESIONALNE_REH:string | null,
  FIZIKALNA_TERAPIJA_ID:number | null,
  SUDIONIK_PROGRAMA_PSIHOPOMOCI_ID:number | null,
  POTREBNO_UKLJUCIVANJE_PSIHOPOMOCI_ID:number | null,
  NAKNADA_TJELESNOG_OSTECENJA_ID:number | null,
  POSTOTAK_TJELESNOG_OSTECENJA:number | null,
  IZNOS_NAKNADE_TJELESNOG_OSTECENJA:number | null,
  NAKNADA_DATUM_OD:Date | null,
  NAKNADA_DATUM_DO:Date | null,
  KORISNIK_INVALIDSKE_MIROVINE_ID:number | null,
  RAZLOG_INVALIDSKE_MIROVINE_ID:number | null,
  IZNOS_INVALIDSKE_MIROVINE:number | null,
  SOCIO_POTPORE_ID:number | null,
  INSTITUCIJA_POTPORA:string | null,
  SOCIO_FINANCIRANO_ID:number | null,
  SUSTAV_JAVNOG_OBRAZOVANJA:number | null,
  JAVNO_ZDRAVSTVO:number | null,
  POLICIJA:number | null,
  CENTRI_ZA_SOCIJALNU_SKRB:number | null,
  ZAVODI_ZA_ZAPOSLJAVANJE:number | null,
  JAVNI_SPORTSKI_SADRZAJI:number | null,
  KULTURNE_USTANOVE:number | null,
  JAVNI_PREVOZI:number | null,
  DOSTUPNOST_INTERNETA:number | null,
  DOSTUPNOST_TRGOVINA:number | null,
  KORISTI_SUSTAV_JAVNOG_OBRAZOVANJA:number | null,
  KORISTI_JAVNO_ZDRAVSTVO:number | null,
  KORISTI_POLICIJA:number | null,
  KORISTI_CENTRI_ZA_SOCIJALNU_SKRB:number | null,
  KORISTI_ZAVODI_ZA_ZAPOSLJAVANJE:number | null,
  KORISTI_JAVNI_SPORTSKI_SADRZAJI:number | null,
  KORISTI_KULTURNE_USTANOVE:number | null,
  KORISTI_JAVNI_PREVOZI:number | null,
  KORISTI_DOSTUPNOST_INTERNETA:number | null,
  PRIJEDLOG_SUSTAV_JAVNOG_OBRAZOVANJA:string | null,
  PRIJEDLOG_JAVNO_ZDRAVSTVO:string | null,
  PRIJEDLOG_POLICIJA:string | null,
  PRIJEDLOG_CENTRI_ZA_SOCIJALNU_SKRB:string | null,
  PRIJEDLOG_ZAVODI_ZA_ZAPOSLJAVANJE:string | null,
  PRIJEDLOG_JAVNI_SPORTSKI_SADRZAJI:string | null,
  PRIJEDLOG_KULTURNE_USTANOVE:string | null,
  PRIJEDLOG_JAVNI_PREVOZI:string | null,
  PRIJEDLOG_DOSTUPNOST_INTERNETA:string | null,
  PRIJEDLOG_DOSTUPNOST_TRGOVINA:string | null,
  USLUGE_NEDOSTUPNE_ID:string | null,
  RAZLOG_NEDOSTUPNE_USLUGE:string | null,
  SUDJELUJETE_DRUGA_USLUGA_ID:number | null,
  NAZIV_DRUGE_USLUGE:string | null,
  OBITELJ_MIROVINA_ID:number | null,
  IZNOS_OBITELJSKE_MIROVINE_ID:number | null,
  RAZLOG_OBITELJSKE_MIROVINE_ID:string | null,
  OBITELJ_DRUGA_PRAVA_ID:number | null,
  OBITELJ_OSTVARILA_PRAVA_ID:string | null,
  OBITELJ_DRUGA_PRAVA_RAZLOG:string | null
  }

  const selectFile = (e:any) => {
    selectedFile=e.target.files[0]
    console.log(`FILE ${selectedFile.name} UPLOADED`)
  }

  const convertExcelToJSON = () => {
    if(selectedFile)
    {
      console.log("DATA FOUND")
      var fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (e:any) =>{
        console.log("FILE READER LOADED")
        var data = e.target.result;
        var workbook = XLSX.read(data,{type:"binary"})
        workbook.SheetNames.forEach(sheet => {

          console.log("CREATING OBJECT")
          let rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
          let jsonObject = JSON.parse(JSON.stringify(rowObject))
          excel = jsonObject[(broj-2)]
          console.log(jsonObject)
          doneConvert = true
          console.log("OBJECT CREATED")

        })   
      }
    }
    else
    {
      console.log("NO DATA")
    }
  }

  const handleStraniJezik = (excel:any,osoba_index:any) =>{
    var straniJezikArr = [];
    var straniJezikObj = {};
    for(var i=1;i<4;i++){
      console.log(osoba_index)
      if(excel[osoba_index+"JEZIK"+i]==="99 Bez odgovora")break;
      if(excel[osoba_index+"JEZIK"+i]==="997 Niti jedan")break;
      if(excel[osoba_index+"JEZIK"+i]===undefined)break;
      if(excel[osoba_index+"JEZIK"+i]==="")break;
      straniJezikObj = {
        jezik: excel[osoba_index+"JEZIK"+i].split(" ")[1],
        slusanje: parseInt(excel[osoba_index+"JEZIK"+i+"_SLUSANJE"].split(" ")[0]),
        citanje: parseInt(excel[osoba_index+"JEZIK"+i+"_CITANJE"].split(" ")[0]),
        govorna_produkcija: parseInt(excel[osoba_index+"JEZIK"+i+"_GOVORNA_PRODUKCIJA"].split(" ")[0]),
        govorna_interakcija: parseInt(excel[osoba_index+"JEZIK"+i+"_GOVORNA_PRODUKCIJA"].split(" ")[0]),
        pisanje: parseInt(excel[osoba_index+"JEZIK"+i+"_PISANJE"].split(" ")[0]),
      }
      straniJezikArr.push(straniJezikObj);
    }
    return straniJezikArr;
  }

  const handleCertifikati = (excel:any,osoba_index:any) =>{
    var certifikatiArr = [];
    var certifikatiObj = {};
    for(var i=1;i<6;i++){
      if(excel[osoba_index+"CER"+i]==="99 Bez odgovora")break;
      if(excel[osoba_index+"CER"+i]==="997 Niti jedan")break;
      if(excel[osoba_index+"CER"+i]==="")break;
      if(excel[osoba_index+"CER"+i]===undefined)break;
      certifikatiObj = {
        naziv_certifikata: excel[osoba_index+"CER"+i]
      }
      certifikatiArr.push(certifikatiObj);
    }
    return certifikatiArr;
  }

  const handleDodatneVjestine = (excel:any,osoba_index:any) =>{
    var dodatneVjestineArr = [];
    var dodatneVjestineObj = {};
    for(var i=1;i<6;i++){
      if(excel[osoba_index+"VJ"+i]==="99 Bez odgovora")break;
      if(excel[osoba_index+"VJ"+i]==="997 Niti jedan")break;
      if(excel[osoba_index+"VJ"+i]==="")break;
      if(excel[osoba_index+"VJ"+i]===undefined)break;
      dodatneVjestineObj = {
        naziv_vjestine: excel[osoba_index+"VJ"+i]
        
      }
      dodatneVjestineArr.push(dodatneVjestineObj);
    }
    return dodatneVjestineArr;
  }

  const handleZnanje = (excel:any,osoba_index:any) =>{
    var znanjeArr = [];
    var znanjeObj = {};
    for(var i=1;i<21;i++){
      if(excel[osoba_index+"ZNANJE_"+i]==="99 Bez odgovora")continue;
      if(excel[osoba_index+"ZNANJE_"+i]==="997 Niti jedan")continue;
      if(excel[osoba_index+"ZNANJE_"+i]==="")continue;
      if(excel[osoba_index+"ZNANJE_"+i]===undefined)continue;
      if(i===20)break;
      znanjeObj = {
        naziv_znanja: parseInt(excel[osoba_index+"ZNANJE_"+i].split(" ")[0]) === 18? excel[osoba_index+"ZNANJE_20"]:(parseInt(excel[osoba_index+"ZNANJE_"+i].split(" ")[0])>9?excel[osoba_index+"ZNANJE_"+i].substring(3):excel[osoba_index+"ZNANJE_"+i].substring(2))        
      }

      znanjeArr.push(znanjeObj);
    }
    return znanjeArr;
  }

  const handleOrtopedska = (excel:any) =>{
    var ortopedskaArr = [];
    var ortopedskaObj = {};
    for(var i=1;i<14;i++){
      if(excel["P_3p11_"+i]==="99 Bez odgovora")continue;
      if(excel["P_3p11_"+i]==="997 Niti jedan")continue;
      if(excel["P_3p11_"+i]==="")continue;
      if(excel["P_3p11_"+i]===undefined)continue;
      ortopedskaObj = {
        naziv_pomagala: parseInt(excel["P_3p11_"+i].split(" ")[0]) === 97? excel["P_3p11_dr"]:excel["P_3p11_"+i].substring(2)        
      }
      ortopedskaArr.push(ortopedskaObj);
    }
    return ortopedskaArr;
  }

  const handleUzdrzavaneOsobe = (excel:any,osoba_index:any) =>{
    var uzdrzavaneOsobeArr = [];
    var uzdrzavaneOsobeObj = {};
    var pom = excel[osoba_index+"BROJ_OSOBA_UZDRZAVATE"]+1
    for(var i=1;i<pom;i++){
      if(excel[osoba_index+"DOZIVOTNO_UZDRZAVANJE_DAVATELJ_ID"]==="")break;
      if(excel[osoba_index+"DOZIVOTNO_UZDRZAVANJE_DAVATELJ_ID"].split(" ")[0]==="2")break;
      if(excel[osoba_index+"DOZIVOTNO_UZDRZAVANJE_DAVATELJ_ID"]===undefined)break;
      uzdrzavaneOsobeObj = {
        srodstvo:excel[osoba_index+"UZD"+i+"_SRODSTVO"].substring(2),
        iznos_uzdrzavanja:parseInt(excel[osoba_index+"UZD"+i+"_IZNOS"].split(" ")[0])       
      }

      uzdrzavaneOsobeArr.push(uzdrzavaneOsobeObj);
    }
    return uzdrzavaneOsobeArr;
  }

  const handlePKZ5 = (excel:any) =>{
    var PKZ5Arr = [];
    var PKZ5Obj = {};
    var pom = parseInt(excel.BROJ_UZDRZAVANIH_OSOBA)+1;
    for(var i=1;i<pom;i++){
      if(excel["POSTOJE_UZDRZAVANE_OSOBE"]==="")break;
      if(excel["POSTOJE_UZDRZAVANE_OSOBE"].split(" ")[0]==="2")break;
      if(excel["POSTOJE_UZDRZAVANE_OSOBE"]===undefined)break;
      PKZ5Obj = {
        srodstvo:excel["pkz5x"+i+"d"].split(" ")[0] === "5"?excel["pkz5x"+i+"d_dr"]: excel["pkz5x"+i+"d"].substring(2) ,
        ime_prezime: excel["pkz5x"+i+"b"] ,
        god_rodenja: excel["pkz5x"+i+"c"] ,
        adresa: excel["pkz5x"+i+"e"] ,
        kontakt: excel["pkz5x"+i+"f"].toString() ,
      }

      PKZ5Arr.push(PKZ5Obj);
    }
    return PKZ5Arr;
  }

  const handlePoslodavci = (excel:any,osoba_index:any) =>{
    var poslodavciArr = [];
    var poslodavciObj = {};
    
      if(excel[osoba_index+"POSLODAVCI"]==="99 Bez odgovora")return [];
      if(excel[osoba_index+"POSLODAVCI"]==="997 Niti jedan")return [];
      if(excel[osoba_index+"POSLODAVCI"]==="")return [];
      if(excel[osoba_index+"POSLODAVCI"]===undefined)return [];
      poslodavciObj = {
        ime_prezime: excel[osoba_index+"POSLODAVCI"]      
      }

      poslodavciArr.push(poslodavciObj);
    
    return poslodavciArr;
  }

  const handleDodatneRacunalne = (excel:any,osoba_index:any) =>{
    var dodatneRacunalneArr = [];
    var dodatneRacunalneObj = {};
    for(var i=1;i<4;i++){
      if(excel[osoba_index+"DOD"+i]==="")break;
      if(excel[osoba_index+"DOD"+i]===undefined)break;
      dodatneRacunalneObj = {
        naziv_vjestine: excel[osoba_index+"DOD"+i],
        id_odgovora: excel[osoba_index+"DOD_ODG_"+i]===undefined?null:parseInt(excel[osoba_index+"DOD_ODG_"+i].split(" ")[0]),
        
      }
      dodatneRacunalneArr.push(dodatneRacunalneObj);
    }
    return dodatneRacunalneArr;
  }

  const handleProgramPsiho = (excel:any) =>{
    var programPsihoArr = [];
    var programPsihoObj = {};
    for(var i=1;i<6;i++){
      if(excel["P_3p17_dr"+i]==="")break;
      if(excel["P_3p17_dr"+i]===undefined)break;
      if(excel["P_3p17"].split(" ")[0]==="8")break;
      programPsihoObj = {
        naziv_pomoci: excel["P_3p17_dr"+i],
        
      }
      programPsihoArr.push(programPsihoObj);
    }
    return programPsihoArr;
  }

  const handleRazlogNeobracanjaPoslodavcu = (excel:any,osoba_index:any) =>{
    var razlog = null;
    for(var i=1;i<=6;i++){
      if(excel[osoba_index+"RAZLOG_NEOBRACANJA_POSLODAVCU_ID"+i]!==undefined){
        razlog = i===6?-2:parseInt(excel[osoba_index+"RAZLOG_NEOBRACANJA_POSLODAVCU_ID"+i].split(" ")[0])
        break;
      }
    }
    return razlog;
  }

  const handleNezainteresiranPrekvalifikacija = (excel:any,osoba_index:any) =>{
    var razlog = null;
    for(var i=1;i<=7;i++){
      if(excel[osoba_index+"NEZAINTERESIRAN_PREKVALIFIKACIJA_ID"+i]!==undefined){
        razlog = i===5?excel[osoba_index+"NEZAINTERESIRAN_PREKVALIFIKACIJA_ID7"]:excel[osoba_index+"NEZAINTERESIRAN_PREKVALIFIKACIJA_ID"+i].substring(2)
        break;
      }
    }
    return razlog;
  }

  const handlePkz3 = (excel:any)=>{
    var pkzObj;
    var pkzArr:any[] = [];
    for (var i=0;i<10;i++)
    {
      var osoba_index = "";
      if(i+1===parseInt(excel.INDEX0)){
        osoba_index="O0_"
      }
      else if(i+1===parseInt(excel.INDEX1)){
        osoba_index="O1_"
      }
      else if(i+1===excel.INDEX2){
        osoba_index="O2_"
      }
      else if(i+1===excel.INDEX3){
        osoba_index="O3_"
      }
      if(excel.F1_ID.split(" ")[0]==="1" && i===0)
      { 
        osoba_index="S_"
      }
      if(excel["pkz3x"+(i+1)+"b"]==="")break;
      var straniJezik = handleStraniJezik(excel,osoba_index);
      var dodatneRacunalne = handleDodatneRacunalne(excel,osoba_index);
      var certifikati = handleCertifikati(excel,osoba_index);
      var dodatneVjestine = handleDodatneVjestine(excel,osoba_index);
      var znanje = handleZnanje(excel,osoba_index);
      var poslodavci = handlePoslodavci(excel,osoba_index);
      var razlogNeobracanjaPoslodavcu = handleRazlogNeobracanjaPoslodavcu(excel,osoba_index);
      var nezainteresiranPrekvalifikacija = handleNezainteresiranPrekvalifikacija(excel,osoba_index);
      var uzdrzavaneOsobe = handleUzdrzavaneOsobe(excel,osoba_index);
      var naseljeZeljeliRaditi:any = [];
      var nazivMjestaTvrtke:any = [];
      naseljeZeljeliRaditi = naselja.find(item => item[3]===excel[osoba_index+"NASELJE_ZELJELI_RADITI_ID"])
      nazivMjestaTvrtke = naselja.find(item => item[3]===(excel[osoba_index+"TVRTKA_NASELJE"]===undefined || excel[osoba_index+"TVRTKA_NASELJE"]==="" ?(excel[osoba_index+"OBRT_NASELJE"]===undefined || excel[osoba_index+"OBRT_NASELJE"]===""?"":excel[osoba_index+"OBRT_NASELJE"]===undefined):excel[osoba_index+"TVRTKA_NASELJE"]))
      console.log(nazivMjestaTvrtke)
      pkzObj = {
        IME_PREZIME: excel["pkz3x"+(i+1)+"b"],
        GOD_RODENJA: excel["pkz3x"+(i+1)+"c"],
        SRODSTVO: excel["pkz3x"+(i+1)+"d"].split(" ")[0]==="6"?excel["pkz3x"+(i+1)+"d_dr"]:excel["pkz3x"+(i+1)+"d"].substring(2),
        RAZINA_OBRAZOVANJA: excel[osoba_index+"RAZINA_OBRAZOVANJA"]===undefined?null:excel[osoba_index+"RAZINA_OBRAZOVANJA"].substring(2),
        STRANI_JEZIK: straniJezik,
        DODATNE_RACUNALNE : dodatneRacunalne,
        CERTIFIKATI: certifikati,
        DODATNE_VJESTINE: dodatneVjestine,
        ZNANJE:znanje,
        POSLODAVCI:poslodavci,
        MATERINJI_JEZIK: excel[osoba_index+"MATERINJI_JEZIK"]===undefined || excel[osoba_index+"MATERINJI_JEZIK"]===""?null:(excel[osoba_index+"MATERINJI_JEZIK"].split(" ")[0]==="2"?excel[osoba_index+"MATERINJI_JEZIK2"]:excel[osoba_index+"MATERINJI_JEZIK"].substring(2)),
        MS_WORD: excel[osoba_index+"WORD"]===undefined?null:(excel[osoba_index+"WORD"].split(" ")[0]==="8"?5:parseInt(excel[osoba_index+"WORD"].split(" ")[0])),
        MS_EXCEL: excel[osoba_index+"EXCEL"]===undefined?null:(excel[osoba_index+"EXCEL"].split(" ")[0]==="8"?5:parseInt(excel[osoba_index+"EXCEL"].split(" ")[0])),
        MS_POWERPOINT: excel[osoba_index+"POWERPOINT"]===undefined?null:(excel[osoba_index+"POWERPOINT"].split(" ")[0]==="8"?5:parseInt(excel[osoba_index+"POWERPOINT"].split(" ")[0])),
        MS_ACCESS: excel[osoba_index+"ACCESS"]===undefined?null:(excel[osoba_index+"ACCESS"].split(" ")[0]==="8"?5:parseInt(excel[osoba_index+"ACCESS"].split(" ")[0])),
        SLUZENJE_INTERNETOM: excel[osoba_index+"INTERNET"]===undefined?null:(excel[osoba_index+"INTERNET"].split(" ")[0]==="8"?5:parseInt(excel[osoba_index+"INTERNET"].split(" ")[0])),
        SLUZENJE_EMAIL: excel[osoba_index+"EMAIL"]===undefined || excel[osoba_index+"EMAIL"]==="" ?null:(excel[osoba_index+"EMAIL"].split(" ")[0]==="8"?5:parseInt(excel[osoba_index+"EMAIL"].split(" ")[0])),
        VOZACKI: excel[osoba_index+"VOZACKI1"]===undefined?(excel[osoba_index+"VOZACKI2"]===undefined?null:parseInt(excel[osoba_index+"VOZACKI2"].split(" ")[0])):parseInt(excel[osoba_index+"VOZACKI1"].split(" ")[0]),
        KRONICNA_BOLEST: osoba_index==="S_" || excel[osoba_index+"KRONICNA_BOLEST1"] === undefined?null:excel[osoba_index+"KRONICNA_BOLEST1"].split(" ")[0] === "1"?excel[osoba_index+"KRONICNA_BOLEST2"]:null,
        WHO1: excel[osoba_index+"WHO1"]===undefined?null:parseInt(excel[osoba_index+"WHO1"].split(" ")[0]),
        WHO2: excel[osoba_index+"WHO2"]===undefined?null:parseInt(excel[osoba_index+"WHO2"].split(" ")[0]),
        WHO3: excel[osoba_index+"WHO3"]===undefined?null:parseInt(excel[osoba_index+"WHO3"].split(" ")[0]),
        WHO4: excel[osoba_index+"WHO4"]===undefined?null:parseInt(excel[osoba_index+"WHO4"].split(" ")[0]),
        WHO5: excel[osoba_index+"WHO5"]===undefined?null:parseInt(excel[osoba_index+"WHO5"].split(" ")[0]),
        WHO6: excel[osoba_index+"WHO6"]===undefined?null:parseInt(excel[osoba_index+"WHO6"].split(" ")[0]),
        WHO7: excel[osoba_index+"WHO7"]===undefined?null:parseInt(excel[osoba_index+"WHO7"].split(" ")[0]),
        WHO8: excel[osoba_index+"WHO8"]===undefined?null:parseInt(excel[osoba_index+"WHO8"].split(" ")[0]),
        WHO9: excel[osoba_index+"WHO9"]===undefined?null:parseInt(excel[osoba_index+"WHO9"].split(" ")[0]),
        WHO10: excel[osoba_index+"WHO10"]===undefined?null:parseInt(excel[osoba_index+"WHO10"].split(" ")[0]),
        WHO11: excel[osoba_index+"WHO11"]===undefined?null:parseInt(excel[osoba_index+"WHO11"].split(" ")[0]),
        WHO12: excel[osoba_index+"WHO12"]===undefined?null:parseInt(excel[osoba_index+"WHO12"].split(" ")[0]),
        WHO_2: excel[osoba_index+"WHO_2"]===undefined?null:parseInt(excel[osoba_index+"WHO_2"]),
        WHO_3: excel[osoba_index+"WHO_3"]===undefined?null:parseInt(excel[osoba_index+"WHO_3"]),
        WHO_4: excel[osoba_index+"WHO_4"]===undefined?null:parseInt(excel[osoba_index+"WHO_4"]),
        DASS21_1: excel[osoba_index+"DASS1"]===undefined?null:parseInt(excel[osoba_index+"DASS1"].split(" ")[0]),
        DASS21_2: excel[osoba_index+"DASS2"]===undefined?null:parseInt(excel[osoba_index+"DASS2"].split(" ")[0]),
        DASS21_3: excel[osoba_index+"DASS3"]===undefined?null:parseInt(excel[osoba_index+"DASS3"].split(" ")[0]),
        DASS21_4: excel[osoba_index+"DASS4"]===undefined?null:parseInt(excel[osoba_index+"DASS4"].split(" ")[0]),
        DASS21_5: excel[osoba_index+"DASS5"]===undefined?null:parseInt(excel[osoba_index+"DASS5"].split(" ")[0]),
        DASS21_6: excel[osoba_index+"DASS6"]===undefined?null:parseInt(excel[osoba_index+"DASS6"].split(" ")[0]),
        DASS21_7: excel[osoba_index+"DASS7"]===undefined?null:parseInt(excel[osoba_index+"DASS7"].split(" ")[0]),
        DASS21_8: excel[osoba_index+"DASS8"]===undefined?null:parseInt(excel[osoba_index+"DASS8"].split(" ")[0]),
        DASS21_9: excel[osoba_index+"DASS9"]===undefined?null:parseInt(excel[osoba_index+"DASS9"].split(" ")[0]),
        DASS21_10: excel[osoba_index+"DASS10"]===undefined?null:parseInt(excel[osoba_index+"DASS10"].split(" ")[0]),
        DASS21_11: excel[osoba_index+"DASS11"]===undefined?null:parseInt(excel[osoba_index+"DASS11"].split(" ")[0]),
        DASS21_12: excel[osoba_index+"DASS12"]===undefined?null:parseInt(excel[osoba_index+"DASS12"].split(" ")[0]),
        DASS21_13: excel[osoba_index+"DASS13"]===undefined?null:parseInt(excel[osoba_index+"DASS13"].split(" ")[0]),
        DASS21_14: excel[osoba_index+"DASS14"]===undefined?null:parseInt(excel[osoba_index+"DASS14"].split(" ")[0]),
        DASS21_15: excel[osoba_index+"DASS15"]===undefined?null:parseInt(excel[osoba_index+"DASS15"].split(" ")[0]),
        DASS21_16: excel[osoba_index+"DASS16"]===undefined?null:parseInt(excel[osoba_index+"DASS16"].split(" ")[0]),
        DASS21_17: excel[osoba_index+"DASS17"]===undefined?null:parseInt(excel[osoba_index+"DASS17"].split(" ")[0]),
        DASS21_18: excel[osoba_index+"DASS18"]===undefined?null:parseInt(excel[osoba_index+"DASS18"].split(" ")[0]),
        DASS21_19: excel[osoba_index+"DASS19"]===undefined?null:parseInt(excel[osoba_index+"DASS19"].split(" ")[0]),
        DASS21_20: excel[osoba_index+"DASS20"]===undefined?null:parseInt(excel[osoba_index+"DASS20"].split(" ")[0]),
        DASS21_21: excel[osoba_index+"DASS21"]===undefined?null:parseInt(excel[osoba_index+"DASS21"].split(" ")[0]),
        STR1: excel[osoba_index+"STR1"]===undefined?null:parseInt(excel[osoba_index+"STR1"]),
        STR2_1: excel[osoba_index+"STR2_1"]===undefined?null:parseInt(excel[osoba_index+"STR2_1"].split(" ")[0]),
        STR2_2: excel[osoba_index+"STR2_2"]===undefined?null:parseInt(excel[osoba_index+"STR2_2"].split(" ")[0]),
        STR2_3: excel[osoba_index+"STR2_3"]===undefined?null:parseInt(excel[osoba_index+"STR2_3"].split(" ")[0]),
        STR2_4: excel[osoba_index+"STR2_4"]===undefined?null:parseInt(excel[osoba_index+"STR2_4"].split(" ")[0]),
        STR2_5: excel[osoba_index+"STR2_5"]===undefined?null:parseInt(excel[osoba_index+"STR2_5"].split(" ")[0]),
        TRENUTNI_RADNI_STATUS_ID: excel[osoba_index+"TRENUTNI_RADNI_STATUS_ID"]===undefined?null:parseInt(excel[osoba_index+"TRENUTNI_RADNI_STATUS_ID"].split(" ")[0]),
        TRENUTNO_ZANIMANJE_ID: excel[osoba_index+"TRENUTNO_ZANIMANJE_ID"]===undefined?null:parseInt(excel[osoba_index+"TRENUTNO_ZANIMANJE_ID"].split(" ")[0]),
        PODJELA_ZANIMANJA_ID: excel[osoba_index+"PODJELA_ZANIMANJA_ID"]===undefined?null:(excel[osoba_index+"PODJELA_ZANIMANJA_ID2"]==="7 Ostalo"?excel[osoba_index+"PODJELA_ZANIMANJA_ID2"].substring(2):excel[osoba_index+"PODJELA_ZANIMANJA_ID"].substring(2)),
        PRIJAVLJEN_HZZO_ID: excel[osoba_index+"PRIJAVLJEN_HZZO_ID"]===undefined?null:(excel[osoba_index+"PRIJAVLJEN_HZZO_ID"].split(" ")[0]==="8"?-1:(excel[osoba_index+"PRIJAVLJEN_HZZO_ID"].split(" ")[0]==="9"?-2:parseInt(excel[osoba_index+"PRIJAVLJEN_HZZO_ID"].split(" ")[0]))),
        PRIJAVLJEN_HZZO_RAZLOG_ID: excel[osoba_index+"PRIJAVLJEN_HZZO_RAZLOG_ID"]===undefined?null:(excel[osoba_index+"PRIJAVLJEN_HZZO_RAZLOG_ID"]==="9 Bez odgovora"?-2:parseInt(excel[osoba_index+"PRIJAVLJEN_HZZO_RAZLOG_ID"].split(" ")[0])),
        HZZO_BROJ_MJESECI: excel[osoba_index+"HZZO_BROJ_MJESECI"]===undefined?null:excel[osoba_index+"HZZO_BROJ_MJESECI"],
        TRAZIO_POSAO_ID: excel[osoba_index+"TRAZIO_POSAO_ID"]===undefined?null:parseInt(excel[osoba_index+"TRAZIO_POSAO_ID"].split(" ")[0]),
        TRAZIO_POSAO_BROJ_PUTA: excel[osoba_index+"TRAZIO_POSAO_BROJ_PUTA"]===undefined?null:parseInt(excel[osoba_index+"TRAZIO_POSAO_BROJ_PUTA"]),
        ISHOD_ZADNJEG_OBRACANJA_POSLODAVCU_ID: excel[osoba_index+"ISHOD_ZADNJEG_OBRACANJA_POSLODAVCU_ID"]===undefined?null:(excel[osoba_index+"ISHOD_ZADNJEG_OBRACANJA_POSLODAVCU_ID"].split(" ")[0]==="9"?-2:parseInt(excel[osoba_index+"ISHOD_ZADNJEG_OBRACANJA_POSLODAVCU_ID"].split(" ")[0])),
        RAZLOG_NEOBRACANJA_POSLODAVCU_ID: razlogNeobracanjaPoslodavcu,
        KATEGORIJA_POSLOVA_ZELJELI_ID: excel[osoba_index+"KATEGORIJA_POSLOVA_ZELJELI_ID"]===undefined?null:(excel[osoba_index+"KATEGORIJA_POSLOVA_ZELJELI_ID"].split(" ")[0]==="8"?excel[osoba_index+"KATEGORIJA_POSLOVA_ZELJELI_ID2"]:excel[osoba_index+"KATEGORIJA_POSLOVA_ZELJELI_ID"].substring(2)),
        ZUPANIJA_ZELJELI_RADITI_ID: excel[osoba_index+"ZUPANIJA_ZELJELI_RADITI_ID"]===undefined || excel[osoba_index+"ZUPANIJA_ZELJELI_RADITI_ID"]==="" ?null:parseInt(excel[osoba_index+"ZUPANIJA_ZELJELI_RADITI_ID"].split(" ")[0]),
        NASELJE_ZELJELI_RADITI_ID: excel[osoba_index+"NASELJE_ZELJELI_RADITI_ID"]===undefined?null:(naseljeZeljeliRaditi===undefined?null:naseljeZeljeliRaditi[0]), //Treba sa axiosom 
        PREKVALIFIKACIJA_ID: excel[osoba_index+"PREKVALIFIKACIJA_ID"]===undefined?null:(excel[osoba_index+"PREKVALIFIKACIJA_ID"].split(" ")[0]==="8"?-1:(excel[osoba_index+"PREKVALIFIKACIJA_ID"].split(" ")[0]==="9"?-2:parseInt(excel[osoba_index+"PREKVALIFIKACIJA_ID"].split(" ")[0]))),
        PITANJE_5P11B_ID: null,
        NEZAINTERESIRAN_PREKVALIFIKACIJA_ID: nezainteresiranPrekvalifikacija===""?null:nezainteresiranPrekvalifikacija,
        NAZIV_TVRTKE: excel[osoba_index+"TVRTKA_NAZIV"]===undefined || excel[osoba_index+"TVRTKA_NAZIV"]===""?(excel[osoba_index+"OBRT_NAZIV"]===undefined || excel[osoba_index+"OBRT_NAZIV"]===""?null:excel[osoba_index+"OBRT_NAZIV"]):excel[osoba_index+"TVRTKA_NAZIV"],
        NAZIV_MJESTA_TVRTKE: excel[osoba_index+"TVRTKA_NASELJE"]===undefined?null:(nazivMjestaTvrtke===undefined?null:nazivMjestaTvrtke[0]), //AXIOS
        NAZIV_ULICE_TVRTKE: excel[osoba_index+"TVRTKA_ULICA"]===undefined || excel[osoba_index+"TVRTKA_ULICA"]===""?(excel[osoba_index+"OBRT_ULICA"]===undefined || excel[osoba_index+"OBRT_ULICA"]===""?null:excel[osoba_index+"OBRT_ULICA"]):excel[osoba_index+"TVRTKA_ULICA"],
        KUCNI_BROJ_TVRTKE: excel[osoba_index+"TVRTKA_KUCNI_BROJ"]===undefined || excel[osoba_index+"TVRTKA_KUCNI_BROJ"]===""?(excel[osoba_index+"OBRT_KUCNI_BROJ"]===undefined || excel[osoba_index+"OBRT_KUCNI_BROJ"]===""?null:excel[osoba_index+"OBRT_KUCNI_BROJ"]):excel[osoba_index+"TVRTKA_KUCNI_BROJ"],
        RADILI_STRUCI_ID: excel[osoba_index+"RADILI_STRUCI_ID"]===undefined?null:(excel[osoba_index+"RADILI_STRUCI_ID"].split(" ")[0]==="8"?-1:(excel[osoba_index+"RADILI_STRUCI_ID"].split(" ")[0]==="9"?-2:parseInt(excel[osoba_index+"RADILI_STRUCI_ID"].split(" ")[0]))),
        NAZIV_STRUKE_ID: excel[osoba_index+"NAZIV_STRUKE_ID"]===undefined || excel[osoba_index+"NAZIV_STRUKE_ID"]===""?null:excel[osoba_index+"NAZIV_STRUKE_ID"],
        IZNOS_PLACE_ID: excel[osoba_index+"IZNOS_PLACE_ID"]===undefined?null:(excel[osoba_index+"IZNOS_PLACE_ID"].split(" ")[0]==="9"?-2:parseInt(excel[osoba_index+"IZNOS_PLACE_ID"].split(" ")[0])),
        UKUPNO_PRIMANJA_ID: excel[osoba_index+"UKUPNO_PRIMANJA_ID"]===undefined?null:(excel[osoba_index+"UKUPNO_PRIMANJA_ID"].split(" ")[0]==="97"?-1:(excel[osoba_index+"UKUPNO_PRIMANJA_ID"].split(" ")[0]==="98"?-2:parseInt(excel[osoba_index+"UKUPNO_PRIMANJA_ID"].split(" ")[0]))),
        UGOVOR_O_DOZIVOTNOM_UZDRZAVANJU_ID: excel[osoba_index+"UGOVOR_O_DOZIVOTNOM_UZDRZAVANJU_ID"]===undefined?null:(excel[osoba_index+"UGOVOR_O_DOZIVOTNOM_UZDRZAVANJU_ID"].split(" ")[0]==="8"?-1:(excel[osoba_index+"UGOVOR_O_DOZIVOTNOM_UZDRZAVANJU_ID"].split(" ")[0]==="9"?-2:parseInt(excel[osoba_index+"UGOVOR_O_DOZIVOTNOM_UZDRZAVANJU_ID"].split(" ")[0]))),
        OSOBA_PRIMATE_UZDRZAVANJE_ID: excel[osoba_index+"OSOBA_PRIMATE_UZDRZAVANJE_ID"]===undefined?null:(excel[osoba_index+"OSOBA_PRIMATE_UZDRZAVANJE_ID"].split(" ")[0]==="9"?-2:parseInt(excel[osoba_index+"OSOBA_PRIMATE_UZDRZAVANJE_ID"].split(" ")[0])),
        IZNOS_UZDRZAVANJA_ID: excel[osoba_index+"IZNOS_UZDRZAVANJA_ID"]===undefined?null:(excel[osoba_index+"IZNOS_UZDRZAVANJA_ID"].split(" ")[0]==="9"?-2:parseInt(excel[osoba_index+"IZNOS_UZDRZAVANJA_ID"].split(" ")[0])),
        DOZIVOTNO_UZDRZAVANJE_DAVATELJ_ID: excel[osoba_index+"DOZIVOTNO_UZDRZAVANJE_DAVATELJ_ID"]===undefined?null:(excel[osoba_index+"DOZIVOTNO_UZDRZAVANJE_DAVATELJ_ID"].split(" ")[0]==="8"?-1:(excel[osoba_index+"DOZIVOTNO_UZDRZAVANJE_DAVATELJ_ID"].split(" ")[0]==="9"?-2:parseInt(excel[osoba_index+"DOZIVOTNO_UZDRZAVANJE_DAVATELJ_ID"].split(" ")[0]))),
        BROJ_OSOBA_UZDRZAVATE: excel[osoba_index+"BROJ_OSOBA_UZDRZAVATE"]===undefined?null:parseInt(excel[osoba_index+"BROJ_OSOBA_UZDRZAVATE"]),
        UZDRZAVANE_OSOBE:uzdrzavaneOsobe,
        MJESTO: null,
        ZUPANIJA: null,
        POST_BROJ: null,
        ADRESA: null
      }
      pkzArr.push(pkzObj);
    }
  return pkzArr;
  }

  const insertData = () => {
     axios.post("http://192.168.0.180:9000/post/anketa",{
      anketa:anketaPrazna
     }).then(res=>{
       console.log(res);
     }).catch(err =>{
       console.log(err);
     })
  }

  const parseData = (excel:any) => {
    var anketaObj;
    var prebivalisteVar:any;
    var boravisteVar:any;
    var posatnskiVar:any;
    var prebivalisteZupanijaVar:any;
    var naseljeVar:any;
    var pkz3Obj:any;
    var ortopedskaPomagala = handleOrtopedska(excel);
    var programPsiho = handleProgramPsiho(excel);
    var pkz5 = handlePKZ5(excel);
    console.log(excel);
    var PKZ3 = handlePkz3(excel);
    console.log(PKZ3);
    var naseljeStradavanja:any = [];
    if(excel.NASELJE_STRADAVANJA_ID!=="" && excel.NASELJE_STRADAVANJA_ID!==undefined){
      naseljeStradavanja = naselja.find(item => item[3]===excel.NASELJE_STRADAVANJA_ID.split(" ")[1]);
    }
    axios.get("http://192.168.0.180:9000/search/mjesto2",{
      params:{search_value: excel.PREBIVALISTE,}
    }).then(res =>{
      console.log(res.data.rows)
      prebivalisteVar = res.data.rows.length===0?null:res.data.rows[0][0]
      posatnskiVar = res.data.rows.length === 0?null:res.data.rows[0][2]
      prebivalisteZupanijaVar = res.data.rows.length === 0?null:res.data.rows[0][5]
      console.log("VAR: " +prebivalisteVar)
      axios.get("http://192.168.0.180:9000/search/mjesto",{
        params:{search_value: excel.BORAVISTE,}
        }).then(res2 =>{
          console.log(res2.data)
          boravisteVar = res2.data[0]===undefined?null:res2.data[0].MJESTO_ID;
          axios.get("http://192.168.0.180:9000/search/mjesto",{
        params:{search_value: excel.NASELJE_RODENJA==="" ||  excel.NASELJE_RODENJA===undefined?"":excel.NASELJE_RODENJA.split(" ")[1],}
      }).then(res3=>{
        console.log(prebivalisteZupanijaVar)
        anketaObj = {
          IME_ZRTVE: excel.IME_ZRTVE===""?excel.pkz3x1b.split(" ")[0]:excel.IME_ZRTVE,
          PREZIME_ZRTVE: excel.PREZIME_ZRTVE===""?excel.pkz3x1b.split(" ")[1]:excel.PREZIME_ZRTVE,
          OIB: excel.OIB==="" || excel.OIB.split(" ")[0]==="999" || excel.OIB.split(" ")[0]==="998" ?null:parseInt(excel.OIB),
          SPOL: parseInt(excel.SPOL)===2?0:1,
          DATUM_RODENJA: new Date(excel.GODINA_RODENJA,excel.MJESEC_RODENJA-1,excel.DAN_RODENJA),
          NASELJE_RODENJA: res3.data[0]===undefined?null:res3.data[0].MJESTO_ID,
          ZUPANIJA_RODENJA: parseInt(excel.ZUPANIJA_RODENJA.split(" ")[0]),
          DRZAVA_RODENJA: excel.DRZAVA_RODENJA.split(" ")[1],
          DRZAVLJANSTVO: excel.DRZAVLJANSTVO.split(" ")[1],
          PREBIVALISTE: prebivalisteVar,
          BORAVISTE: boravisteVar,
          POSTANSKI_BROJ: posatnskiVar,
          ULICA_STANOVANJA: excel.ULICA_STANOVANJA,
          FIKSNI: excel.FIKSNI==="" || excel.FIKSNI === undefined ? null:excel.FIKSNI,
          MOBILNI: excel.MOBILNI==="" || excel.MOBILNI === undefined ?null:excel.MOBILNI,
          EMAIL: excel.EMAIL==="" || excel.EMAIL===undefined ?null:excel.EMAIL,
          BRACNO_STANJE: parseInt(excel.BRACNO_STANJE.split(" ")[0]),
          ZUPANIJA_PREBIVALISTA: zupanije.find(item => item.naziv === prebivalisteZupanijaVar)?.id,
          F1_ID: parseInt(excel.F1_ID.split(" ")[0]),
          F2_ID: excel.F2_ID===undefined?null:parseInt(excel.F2_ID.split(" ")[0]),

          IME_PREZIME_ISPUNJAVA: parseInt(excel.F1_ID.split(" ")[0])===1?PKZ3[0].IME_PREZIME:PKZ3[parseInt(excel.INDEKS_ISPUNJAVA)-1].IME_PREZIME,
          GOD_RODJENJA_ISPUNJAVA: parseInt(excel.F1_ID.split(" ")[0])===1?PKZ3[0].GOD_RODENJA:PKZ3[parseInt(excel.INDEKS_ISPUNJAVA)-1].GOD_RODENJA,
          SRODSTVO_ID: parseInt(excel.F1_ID.split(" ")[0])===1?PKZ3[0].SRODSTVO:PKZ3[parseInt(excel.INDEKS_ISPUNJAVA)-1].SRODSTVO,
          
          BROJ_OSOBA_U_KUCANSTVU: excel.BROJ_OSOBA_U_KUCANSTVU,
          POSTOJE_UZDRZAVANE_OSOBE: excel.POSTOJE_UZDRZAVANE_OSOBE===undefined?null:parseInt(excel.POSTOJE_UZDRZAVANE_OSOBE.split(" ")[0]),
          BROJ_UZDRZAVANIH_OSOBA: excel.BROJ_UZDRZAVANIH_OSOBA===undefined?null:parseInt(excel.BROJ_UZDRZAVANIH_OSOBA),
          ZUPANIJA_STRADAVANJA_ID: parseInt(excel.ZUPANIJA_STRADAVANJA_ID.split(" ")[0]),
          NASELJE_STRADAVANJA_ID: excel.NASELJE_STRADAVANJA_ID==="" || excel.NASELJE_STRADAVANJA_ID===undefined || naseljeStradavanja===undefined || naseljeStradavanja===null?null:naseljeStradavanja[0],
          LOKACIJA_STRADAVANJA_ID:  excel.LOKACIJA_STRADAVANJA_ID==="" || excel.LOKACIJA_STRADAVANJA_ID===undefined ?null: excel.LOKACIJA_STRADAVANJA_ID,
          PODRUCJE_STRADAVANJA_ID: excel.PODRUCJE_STRADAVANJA_ID==="" || excel.PODRUCJE_STRADAVANJA_ID===undefined ?null: excel.PODRUCJE_STRADAVANJA_ID.substring(2),
          DAN_STRADAVANJA: excel.DAN_STRADAVANJA==="" || excel.DAN_STRADAVANJA===undefined || excel.DAN_STRADAVANJA.toString().split(" ")[0]==="99" ?null:excel.DAN_STRADAVANJA,
          MJESEC_STRADAVANJA: excel.MJESEC_STRADAVANJA==="" || excel.MJESEC_STRADAVANJA===undefined || excel.MJESEC_STRADAVANJA.toString().split(" ")[0]==="99" ?null:excel.MJESEC_STRADAVANJA,
          GODINA_STRADAVANJA: excel.GODINA_STRADAVANJA==="" || excel.GODINA_STRADAVANJA===undefined || excel.GODINA_STRADAVANJA.toString().split(" ")[0]==="99" || excel.GODINA_STRADAVANJA.toString().split(" ")[0]==="9999" ?null:excel.GODINA_STRADAVANJA,
          VRSTA_STRADAVANJA_ID: excel.VRSTA_STRADAVANJA_ID==="" || excel.VRSTA_STRADAVANJA_ID===undefined ?null:excel.VRSTA_STRADAVANJA_ID.substring(2),
          VRSTA_EKSPLOZIVNOG_SREDSTVA_ID: excel.VRSTA_EKSPLOZIVNOG_SREDSTVA_ID==="" || excel.VRSTA_EKSPLOZIVNOG_SREDSTVA_ID===undefined?null:(excel.VRSTA_EKSPLOZIVNOG_SREDSTVA_ID.split(" ")[0]==="98"?-1:parseInt(excel.VRSTA_EKSPLOZIVNOG_SREDSTVA_ID.split(" ")[0])),
          NAZIV_EKS: excel.NAZIV_EKS===""||excel.NAZIV_EKS===undefined?null:excel.NAZIV_EKS,
          OZNAKA_EKS: excel.OZNAKA_EKS===""||excel.OZNAKA_EKS===undefined?null:excel.OZNAKA_EKS,
          STUPANJ_TJELESNOG_OSTECENJA_ID:excel.STUPANJ_TJELESNOG_OSTECENJA_ID==="" || excel.STUPANJ_TJELESNOG_OSTECENJA_ID===undefined ?null:(excel.STUPANJ_TJELESNOG_OSTECENJA_ID.split(" ")[0]==="8"?-1:(excel.STUPANJ_TJELESNOG_OSTECENJA_ID.split(" ")[0]==="9"?-1:parseInt(excel.STUPANJ_TJELESNOG_OSTECENJA_ID.split(" ")[0]))),
          DODATNI_OPIS_OZLJEDE: excel.DODATNI_OPIS_OZLJEDE===""||excel.DODATNI_OPIS_OZLJEDE===undefined?null:excel.DODATNI_OPIS_OZLJEDE,
          ZDRAVSTVENO_STANJE_PROMJENE_ID: excel.ZDRAVSTVENO_STANJE_PROMJENE_ID==="" || excel.ZDRAVSTVENO_STANJE_PROMJENE_ID===undefined ?null:(excel.ZDRAVSTVENO_STANJE_PROMJENE_ID.split(" ")[0]==="8"?-1:parseInt(excel.ZDRAVSTVENO_STANJE_PROMJENE_ID.split(" ")[0])),
          ZDRAVSTVENO_STANJE_PROMJENE_OPIS: excel.ZDRAVSTVENO_STANJE_PROMJENE_OPIS===""?null:excel.ZDRAVSTVENO_STANJE_PROMJENE_OPIS,
          DIJAGNOZA_ID: excel.DIJAGNOZA_ID===""||excel.DIJAGNOZA_ID===undefined?null:excel.DIJAGNOZA_ID,
          VRSTA_ZANIMANJA_ID: excel.VRSTA_ZANIMANJA_ID === "" || excel.VRSTA_ZANIMANJA_ID === undefined ? null :excel.VRSTA_ZANIMANJA_ID.substring(2),
          MJESTO_STRADAVANJA_SUMNJIVO_ID:excel.MJESTO_STRADAVANJA_SUMNJIVO_ID==="" || excel.MJESTO_STRADAVANJA_SUMNJIVO_ID===undefined ?null: (parseInt(excel.MJESTO_STRADAVANJA_SUMNJIVO_ID.split(" ")[0])===8?-1:(parseInt(excel.MJESTO_STRADAVANJA_SUMNJIVO_ID.split(" ")[0])===9?-2:parseInt(excel.MJESTO_STRADAVANJA_SUMNJIVO_ID.split(" ")[0]))),
          POSTUPAK_NAKNADA_STETE_ID: excel.POSTUPAK_NAKNADA_STETE_ID==="" || excel.POSTUPAK_NAKNADA_STETE_ID===undefined ?null:(excel.POSTUPAK_NAKNADA_STETE_ID.split(" ")[0]==="8"?-1:(excel.POSTUPAK_NAKNADA_STETE_ID.split(" ")[0]==="9"?-2:parseInt(excel.POSTUPAK_NAKNADA_STETE_ID.split(" ")[0]))),
          POSTUPAK_NAKNADA_STETE_NACIN_ID: excel.POSTUPAK_NAKNADA_STETE_NACIN_ID==="" || excel.POSTUPAK_NAKNADA_STETE_NACIN_ID===undefined ?null:(excel.POSTUPAK_NAKNADA_STETE_NACIN_ID.split(" ")[0]==="8" || excel.POSTUPAK_NAKNADA_STETE_NACIN_ID.split(" ")[0]==="9" ?-1:parseInt(excel.POSTUPAK_NAKNADA_STETE_NACIN_ID.split(" ")[0])),
          FAZA_NAKNADE_STETE_ID: excel.FAZA_NAKNADE_STETE_ID==="" || excel.FAZA_NAKNADE_STETE_ID===undefined ?null:(excel.FAZA_NAKNADE_STETE_ID.split(" ")[0]==="8" || excel.FAZA_NAKNADE_STETE_ID.split(" ")[0]==="9 "?-1:parseInt(excel.FAZA_NAKNADE_STETE_ID.split(" ")[0])),
          ISHOD_POSTUPKA_NAKNADE_STETE_ID: excel.ISHOD_POSTUPKA_NAKNADE_STETE_ID==="" || excel.ISHOD_POSTUPKA_NAKNADE_STETE_ID===undefined ?null:(excel.ISHOD_POSTUPKA_NAKNADE_STETE_ID.split(" ")[0]==="8"?-1:parseInt(excel.ISHOD_POSTUPKA_NAKNADE_STETE_ID.split(" ")[0])),
          POSTUPAK_RADNE_SPOSOBNOSTI_ID: excel.POSTUPAK_RADNE_SPOSOBNOSTI_ID==="" || excel.POSTUPAK_RADNE_SPOSOBNOSTI_ID===undefined ?null:(excel.POSTUPAK_RADNE_SPOSOBNOSTI_ID.split(" ")[0]==="8"?-1:(excel.POSTUPAK_RADNE_SPOSOBNOSTI_ID.split(" ")[0]==="9"?-2:parseInt(excel.POSTUPAK_RADNE_SPOSOBNOSTI_ID.split(" ")[0]))),
          OCJENA_RADNE_SPOSOBNOSTI_ID: excel.OCJENA_RADNE_SPOSOBNOSTI_ID==="" || excel.OCJENA_RADNE_SPOSOBNOSTI_ID===undefined ?null:(excel.OCJENA_RADNE_SPOSOBNOSTI_ID.split(" ")[0]==="8" || excel.OCJENA_RADNE_SPOSOBNOSTI_ID.split(" ")[0]==="9"?-1:parseInt(excel.OCJENA_RADNE_SPOSOBNOSTI_ID.split(" ")[0])),
          POTREBNA_TUDJA_POMOC_ID: excel.POTREBNA_TUDJA_POMOC_ID==="" || excel.POTREBNA_TUDJA_POMOC_ID===undefined ?null:parseInt(excel.POTREBNA_TUDJA_POMOC_ID.split(" ")[0]),
          POMOC_DRUGE_OSOBE_SASTOJI: excel.POMOC_DRUGE_OSOBE_SASTOJI==="" || excel.POMOC_DRUGE_OSOBE_SASTOJI===undefined?null:excel.POMOC_DRUGE_OSOBE_SASTOJI,
          TJEDNO_SATI_POMOC_ID: excel.TJEDNO_SATI_POMOC1 === "" || excel.TJEDNO_SATI_POMOC1 === undefined ?null:(parseInt(excel.TJEDNO_SATI_POMOC1.split(" ")[0])-1)*4 + parseInt(excel.TJEDNO_SATI_POMOC2.split(" ")[0]) ,
          KORISNIK_DOPLATKA_ZA_POMOC_ID: excel.KORISNIK_DOPLATKA_ZA_POMOC_ID==="" || excel.KORISNIK_DOPLATKA_ZA_POMOC_ID===undefined ?null: parseInt(excel.KORISNIK_DOPLATKA_ZA_POMOC_ID.split(" ")[0]),
          KORISTITE_ORTOPEDSKO_POMAGALO_ID: excel.KORISTITE_ORTOPEDSKO_POMAGALO_ID==="" || excel.KORISTITE_ORTOPEDSKO_POMAGALO_ID===undefined ?null:  parseInt(excel.KORISTITE_ORTOPEDSKO_POMAGALO_ID.split(" ")[0]),
          PRAVO_PROFESIONALNE_REHABILITACIJE_ID: excel.PRAVO_PROFESIONALNE_REHABILITACIJE_ID==="" || excel.PRAVO_PROFESIONALNE_REHABILITACIJE_ID===undefined ?null:(excel.PRAVO_PROFESIONALNE_REHABILITACIJE_ID.split(" ")[0]==="8"?-1:(excel.PRAVO_PROFESIONALNE_REHABILITACIJE_ID.split(" ")[0]==="9"?-2:parseInt(excel.PRAVO_PROFESIONALNE_REHABILITACIJE_ID.split(" ")[0]))),
          KAKVO_PRAVO_PROFESIONALNE_REH: excel.KAKVO_PRAVO_PROFESIONALNE_REH===""?null:excel.KAKVO_PRAVO_PROFESIONALNE_REH,
          FIZIKALNA_TERAPIJA_ID: excel.FIZIKALNA_TERAPIJA_ID==="" || excel.FIZIKALNA_TERAPIJA_ID===undefined ?null:(excel.FIZIKALNA_TERAPIJA_ID.split(" ")[0]==="8"?-1:(excel.FIZIKALNA_TERAPIJA_ID.split(" ")[0]==="9"?-2:parseInt(excel.FIZIKALNA_TERAPIJA_ID.split(" ")[0]))),
          SUDIONIK_PROGRAMA_PSIHOPOMOCI_ID: excel.SUDIONIK_PROGRAMA_PSIHOPOMOCI_ID==="" || excel.SUDIONIK_PROGRAMA_PSIHOPOMOCI_ID===undefined ?null:(excel.SUDIONIK_PROGRAMA_PSIHOPOMOCI_ID.split(" ")[0]==="8"?-1:(excel.SUDIONIK_PROGRAMA_PSIHOPOMOCI_ID.split(" ")[0]==="9"?-2:parseInt(excel.SUDIONIK_PROGRAMA_PSIHOPOMOCI_ID.split(" ")[0]))),
          POTREBNO_UKLJUCIVANJE_PSIHOPOMOCI_ID: excel.POTREBNO_UKLJUCIVANJE_PSIHOPOMOCI_ID==="" || excel.POTREBNO_UKLJUCIVANJE_PSIHOPOMOCI_ID===undefined ?null:(excel.POTREBNO_UKLJUCIVANJE_PSIHOPOMOCI_ID.split(" ")[0]==="8"?-1:(excel.POTREBNO_UKLJUCIVANJE_PSIHOPOMOCI_ID.split(" ")[0]==="9"?-2:parseInt(excel.POTREBNO_UKLJUCIVANJE_PSIHOPOMOCI_ID.split(" ")[0]))),
          NAKNADA_TJELESNOG_OSTECENJA_ID: excel.NAKNADA_TJELESNOG_OSTECENJA_ID==="" || excel.NAKNADA_TJELESNOG_OSTECENJA_ID===undefined ?null:(excel.NAKNADA_TJELESNOG_OSTECENJA_ID.split(" ")[0]==="8" || excel.NAKNADA_TJELESNOG_OSTECENJA_ID.split(" ")[0]==="9" ?-1:parseInt(excel.NAKNADA_TJELESNOG_OSTECENJA_ID.split(" ")[0])),
          POSTOTAK_TJELESNOG_OSTECENJA : excel.POSTOTAK_TJELESNOG_OSTECENJA===undefined || excel.POSTOTAK_TJELESNOG_OSTECENJA==="" ?null:parseInt(excel.POSTOTAK_TJELESNOG_OSTECENJA),
          IZNOS_NAKNADE_TJELESNOG_OSTECENJA: excel.IZNOS_NAKNADE_TJELESNOG_OSTECENJA===undefined || excel.IZNOS_NAKNADE_TJELESNOG_OSTECENJA===""?null:(excel.IZNOS_NAKNADE_TJELESNOG_OSTECENJA.toString().split(" ")[0]==="9"?null:excel.IZNOS_NAKNADE_TJELESNOG_OSTECENJA),
          NAKNADA_DATUM_OD: excel.NAKNADA_DATUM_OD_GODINA===undefined?null: new Date(parseInt(excel.NAKNADA_DATUM_OD_GODINA),parseInt(excel.NAKNADA_DATUM_OD_MJESEC)-1,1),
          NAKNADA_DATUM_DO: excel.NAKNADA_DATUM_DO_GODINA===undefined?null: new Date(parseInt(excel.NAKNADA_DATUM_DO_GODINA),parseInt(excel.NAKNADA_DATUM_DO_MJESEC)-1,1),
          KORISNIK_INVALIDSKE_MIROVINE_ID: excel.KORISNIK_INVALIDSKE_MIROVINE_ID==="" || excel.KORISNIK_INVALIDSKE_MIROVINE_ID===undefined ?null: parseInt(excel.KORISNIK_INVALIDSKE_MIROVINE_ID.split(" ")[0]),
          RAZLOG_INVALIDSKE_MIROVINE_ID: excel.RAZLOG_INVALIDSKE_MIROVINE_ID==="" || excel.RAZLOG_INVALIDSKE_MIROVINE_ID===undefined ?null:(excel.RAZLOG_INVALIDSKE_MIROVINE_ID.split(" ")[0]==="8"?-1:(excel.RAZLOG_INVALIDSKE_MIROVINE_ID.split(" ")[0]==="9"?-1:parseInt(excel.RAZLOG_INVALIDSKE_MIROVINE_ID.split(" ")[0]))),
          IZNOS_INVALIDSKE_MIROVINE: excel.IZNOS_INVALIDSKE_MIROVINE===undefined || excel.IZNOS_INVALIDSKE_MIROVINE==="" ?null:(excel.IZNOS_INVALIDSKE_MIROVINE.toString().split(" ")[0]==="9"?null:excel.IZNOS_INVALIDSKE_MIROVINE),
          SOCIO_POTPORE_ID: excel.SOCIO_POTPORE_ID==="" || excel.SOCIO_POTPORE_ID===undefined ?null:(excel.SOCIO_POTPORE_ID.split(" ")[0]==="8"?-1:(excel.SOCIO_POTPORE_ID.split(" ")[0]==="9"?-2:parseInt(excel.SOCIO_POTPORE_ID.split(" ")[0]))),
          INSTITUCIJA_POTPORA: excel.INSTITUCIJA_POTPORA==="" || excel.INSTITUCIJA_POTPORA === undefined?null:parseInt(excel.INSTITUCIJA_POTPORA.split(" ")[0]) === 1 ? excel.INSTITUCIJA_POTPORA2 : excel.INSTITUCIJA_POTPORA.substring(2),
          SOCIO_FINANCIRANO_ID: excel.SOCIO_FINANCIRANO_ID==="" || excel.SOCIO_FINANCIRANO_ID ===undefined ?null:(excel.SOCIO_FINANCIRANO_ID.split(" ")[0]==="8"?-1:(excel.SOCIO_FINANCIRANO_ID.split(" ")[0]==="9"?-2:parseInt(excel.SOCIO_FINANCIRANO_ID.split(" ")[0]))),
          SUSTAV_JAVNOG_OBRAZOVANJA: excel.SUSTAV_JAVNOG_OBRAZOVANJA===""||excel.SUSTAV_JAVNOG_OBRAZOVANJA===undefined?null:parseInt(excel.SUSTAV_JAVNOG_OBRAZOVANJA.toString().split(" ")[0])=== 97?11:parseInt(excel.SUSTAV_JAVNOG_OBRAZOVANJA.toString().split(" ")[0])===99?12:parseInt(excel.SUSTAV_JAVNOG_OBRAZOVANJA.toString().split(" ")[0]) === 1 || parseInt(excel.SUSTAV_JAVNOG_OBRAZOVANJA.toString().split(" ")[0]) === 10 ? parseInt(excel.SUSTAV_JAVNOG_OBRAZOVANJA.toString().split(" ")[0]):parseInt(excel.SUSTAV_JAVNOG_OBRAZOVANJA),
          JAVNO_ZDRAVSTVO: excel.JAVNO_ZDRAVSTVO===""||excel.JAVNO_ZDRAVSTVO===undefined?null:parseInt(excel.JAVNO_ZDRAVSTVO.toString().split(" ")[0])=== 97?11:parseInt(excel.JAVNO_ZDRAVSTVO.toString().split(" ")[0])===99?12:parseInt(excel.JAVNO_ZDRAVSTVO.toString().split(" ")[0]) === 1 || parseInt(excel.JAVNO_ZDRAVSTVO.toString().split(" ")[0]) === 10 ? parseInt(excel.JAVNO_ZDRAVSTVO.toString().split(" ")[0]):parseInt(excel.JAVNO_ZDRAVSTVO),
          POLICIJA: excel.POLICIJA===""||excel.POLICIJA===undefined?null:parseInt(excel.POLICIJA.toString().split(" ")[0])=== 97?11:parseInt(excel.POLICIJA.toString().split(" ")[0])===99?12:parseInt(excel.POLICIJA.toString().split(" ")[0]) === 1 || parseInt(excel.POLICIJA.toString().split(" ")[0]) === 10 ? parseInt(excel.POLICIJA.toString().split(" ")[0]):parseInt(excel.POLICIJA),
          CENTRI_ZA_SOCIJALNU_SKRB: excel.CENTRI_ZA_SOCIJALNU_SKRB===""||excel.CENTRI_ZA_SOCIJALNU_SKRB===undefined?null:parseInt(excel.CENTRI_ZA_SOCIJALNU_SKRB.toString().split(" ")[0])=== 97?11:parseInt(excel.CENTRI_ZA_SOCIJALNU_SKRB.toString().split(" ")[0])===99?12:parseInt(excel.CENTRI_ZA_SOCIJALNU_SKRB.toString().split(" ")[0]) === 1 || parseInt(excel.CENTRI_ZA_SOCIJALNU_SKRB.toString().split(" ")[0]) === 10 ? parseInt(excel.CENTRI_ZA_SOCIJALNU_SKRB.toString().split(" ")[0]):parseInt(excel.CENTRI_ZA_SOCIJALNU_SKRB) ,
          ZAVODI_ZA_ZAPOSLJAVANJE: excel.ZAVODI_ZA_ZAPOSLJAVANJE===""||excel.ZAVODI_ZA_ZAPOSLJAVANJE===undefined?null:parseInt(excel.ZAVODI_ZA_ZAPOSLJAVANJE.toString().split(" ")[0])===97?11:parseInt(excel.ZAVODI_ZA_ZAPOSLJAVANJE.toString().split(" ")[0])===99?12:parseInt(excel.ZAVODI_ZA_ZAPOSLJAVANJE.toString().split(" ")[0]) ===1 || parseInt(excel.ZAVODI_ZA_ZAPOSLJAVANJE.toString().split(" ")[0]) ===10? parseInt(excel.ZAVODI_ZA_ZAPOSLJAVANJE.toString().split(" ")[0]) :parseInt(excel.ZAVODI_ZA_ZAPOSLJAVANJE),
          JAVNI_SPORTSKI_SADRZAJI: excel.JAVNI_SPORTSKI_SADRZAJI===""||excel.JAVNI_SPORTSKI_SADRZAJI===undefined?null:parseInt(excel.JAVNI_SPORTSKI_SADRZAJI.toString().split(" ")[0])===97?11:parseInt(excel.JAVNI_SPORTSKI_SADRZAJI.toString().split(" ")[0])===99?12:parseInt(excel.JAVNI_SPORTSKI_SADRZAJI.toString().split(" ")[0])===1 || parseInt(excel.JAVNI_SPORTSKI_SADRZAJI.toString().split(" ")[0])===10?parseInt(excel.JAVNI_SPORTSKI_SADRZAJI.toString().split(" ")[0]):parseInt(excel.JAVNI_SPORTSKI_SADRZAJI),
          KULTURNE_USTANOVE: excel.KULTURNE_USTANOVE===""||excel.KULTURNE_USTANOVE===undefined?null:parseInt(excel.KULTURNE_USTANOVE.toString().split(" ")[0])===97?11:parseInt(excel.KULTURNE_USTANOVE.toString().split(" ")[0])===99?12:parseInt(excel.KULTURNE_USTANOVE.toString().split(" ")[0])===1 || parseInt(excel.KULTURNE_USTANOVE.toString().split(" ")[0])===10?parseInt(excel.KULTURNE_USTANOVE.toString().split(" ")[0]):parseInt(excel.KULTURNE_USTANOVE),
          JAVNI_PREVOZI: excel.JAVNI_PREVOZI===""||excel.JAVNI_PREVOZI===undefined?null:parseInt(excel.JAVNI_PREVOZI.toString().split(" ")[0])===97?11:parseInt(excel.JAVNI_PREVOZI.toString().split(" ")[0])===99?12:parseInt(excel.JAVNI_PREVOZI.toString().split(" ")[0])===1 || parseInt(excel.JAVNI_PREVOZI.toString().split(" ")[0])===10?parseInt(excel.JAVNI_PREVOZI.toString().split(" ")[0]):parseInt(excel.JAVNI_PREVOZI),
          DOSTUPNOST_INTERNETA: excel.DOSTUPNOST_INTERNETA===""||excel.DOSTUPNOST_INTERNETA===undefined?null:parseInt(excel.DOSTUPNOST_INTERNETA.toString().split(" ")[0])===97?11:parseInt(excel.DOSTUPNOST_INTERNETA.toString().split(" ")[0])===99?12:parseInt(excel.DOSTUPNOST_INTERNETA.toString().split(" ")[0])===1 || parseInt(excel.DOSTUPNOST_INTERNETA.toString().split(" ")[0])===10?parseInt(excel.DOSTUPNOST_INTERNETA.toString().split(" ")[0]):parseInt(excel.DOSTUPNOST_INTERNETA) ,
          DOSTUPNOST_TRGOVINA: excel.DOSTUPNOST_TRGOVINA===""||excel.DOSTUPNOST_TRGOVINA===undefined?null:parseInt(excel.DOSTUPNOST_TRGOVINA.toString().split(" ")[0])===97?11:parseInt(excel.DOSTUPNOST_TRGOVINA.toString().split(" ")[0])===99?12:parseInt(excel.DOSTUPNOST_TRGOVINA.toString().split(" ")[0])===1 || parseInt(excel.DOSTUPNOST_TRGOVINA.toString().split(" ")[0])===10 ?parseInt(excel.DOSTUPNOST_TRGOVINA.toString().split(" ")[0]):parseInt(excel.DOSTUPNOST_TRGOVINA)  ,

          KORISTI_SUSTAV_JAVNOG_OBRAZOVANJA: excel.KORISTI_SUSTAV_JAVNOG_OBRAZOVANJA==="" || excel.KORISTI_SUSTAV_JAVNOG_OBRAZOVANJA===undefined ?null:(excel.KORISTI_SUSTAV_JAVNOG_OBRAZOVANJA.split(" ")[0]==="8"?-1:(excel.KORISTI_SUSTAV_JAVNOG_OBRAZOVANJA.split(" ")[0]==="9"?-2:parseInt(excel.KORISTI_SUSTAV_JAVNOG_OBRAZOVANJA.split(" ")[0]))),
          KORISTI_JAVNO_ZDRAVSTVO: excel.KORISTI_JAVNO_ZDRAVSTVO==="" || excel.KORISTI_JAVNO_ZDRAVSTVO ===undefined ?null:(excel.KORISTI_JAVNO_ZDRAVSTVO.split(" ")[0]==="8"?-1:(excel.KORISTI_JAVNO_ZDRAVSTVO.split(" ")[0]==="9"?-2:parseInt(excel.KORISTI_JAVNO_ZDRAVSTVO.split(" ")[0]))),
          KORISTI_POLICIJA: excel.KORISTI_POLICIJA==="" || excel.KORISTI_POLICIJA ===undefined ?null:(excel.KORISTI_POLICIJA.split(" ")[0]==="8"?-1:(excel.KORISTI_POLICIJA.split(" ")[0]==="9"?-2:parseInt(excel.KORISTI_POLICIJA.split(" ")[0]))),
          KORISTI_CENTRI_ZA_SOCIJALNU_SKRB: excel.KORISTI_CENTRI_ZA_SOCIJALNU_SKRB==="" || excel.KORISTI_CENTRI_ZA_SOCIJALNU_SKRB ===undefined ?null:(excel.KORISTI_CENTRI_ZA_SOCIJALNU_SKRB.split(" ")[0]==="8"?-1:(excel.KORISTI_CENTRI_ZA_SOCIJALNU_SKRB.split(" ")[0]==="9"?-2:parseInt(excel.KORISTI_CENTRI_ZA_SOCIJALNU_SKRB.split(" ")[0]))),
          KORISTI_ZAVODI_ZA_ZAPOSLJAVANJE: excel.KORISTI_ZAVODI_ZA_ZAPOSLJAVANJE==="" || excel.KORISTI_ZAVODI_ZA_ZAPOSLJAVANJE ===undefined ?null:(excel.KORISTI_ZAVODI_ZA_ZAPOSLJAVANJE.split(" ")[0]==="8"?-1:(excel.KORISTI_ZAVODI_ZA_ZAPOSLJAVANJE.split(" ")[0]==="9"?-2:parseInt(excel.KORISTI_ZAVODI_ZA_ZAPOSLJAVANJE.split(" ")[0]))),
          KORISTI_JAVNI_SPORTSKI_SADRZAJI: excel.KORISTI_JAVNI_SPORTSKI_SADRZAJI==="" || excel.KORISTI_JAVNI_SPORTSKI_SADRZAJI ===undefined ?null:(excel.KORISTI_JAVNI_SPORTSKI_SADRZAJI.split(" ")[0]==="8"?-1:(excel.KORISTI_JAVNI_SPORTSKI_SADRZAJI.split(" ")[0]==="9"?-2:parseInt(excel.KORISTI_JAVNI_SPORTSKI_SADRZAJI.split(" ")[0]))),
          KORISTI_KULTURNE_USTANOVE:  excel.KORISTI_KULTURNE_USTANOVE==="" || excel.KORISTI_KULTURNE_USTANOVE ===undefined ?null:(excel.KORISTI_KULTURNE_USTANOVE.split(" ")[0]==="8"?-1:(excel.KORISTI_KULTURNE_USTANOVE.split(" ")[0]==="9"?-2:parseInt(excel.KORISTI_KULTURNE_USTANOVE.split(" ")[0]))),
          KORISTI_JAVNI_PREVOZI: excel.KORISTI_JAVNI_PREVOZI==="" || excel.KORISTI_JAVNI_PREVOZI ===undefined ?null:(excel.KORISTI_JAVNI_PREVOZI.split(" ")[0]==="8"?-1:(excel.KORISTI_JAVNI_PREVOZI.split(" ")[0]==="9"?-2:parseInt(excel.KORISTI_JAVNI_PREVOZI.split(" ")[0]))),
          KORISTI_DOSTUPNOST_INTERNETA: excel.KORISTI_DOSTUPNOST_INTERNETA==="" || excel.KORISTI_DOSTUPNOST_INTERNETA ===undefined ?null:(excel.KORISTI_DOSTUPNOST_INTERNETA.split(" ")[0]==="8"?-1:(excel.KORISTI_DOSTUPNOST_INTERNETA.split(" ")[0]==="9"?-2:parseInt(excel.KORISTI_DOSTUPNOST_INTERNETA.split(" ")[0]))),

          PRIJEDLOG_SUSTAV_JAVNOG_OBRAZOVANJA: excel.PRIJEDLOG_SUSTAV_JAVNOG_OBRAZOVANJA===""||excel.PRIJEDLOG_SUSTAV_JAVNOG_OBRAZOVANJA===undefined?null: parseInt(excel.PRIJEDLOG_SUSTAV_JAVNOG_OBRAZOVANJA.split(" ")[0]) === 999?null:excel.PRIJEDLOG_SUSTAV_JAVNOG_OBRAZOVANJA.substring(2),
          PRIJEDLOG_JAVNO_ZDRAVSTVO: excel.PRIJEDLOG_JAVNO_ZDRAVSTVO===""||excel.PRIJEDLOG_JAVNO_ZDRAVSTVO===undefined?null:parseInt(excel.PRIJEDLOG_JAVNO_ZDRAVSTVO.split(" ")[0])===999?null:excel.PRIJEDLOG_JAVNO_ZDRAVSTVO.substring(2),
          PRIJEDLOG_POLICIJA: excel.PRIJEDLOG_POLICIJA===""||excel.PRIJEDLOG_POLICIJA===undefined?null:parseInt(excel.PRIJEDLOG_POLICIJA.split(" ")[0])===999?null:excel.PRIJEDLOG_POLICIJA.substring(2),
          PRIJEDLOG_CENTRI_ZA_SOCIJALNU_SKRB: excel.PRIJEDLOG_CENTRI_ZA_SOCIJALNU_SKRB===""||excel.PRIJEDLOG_CENTRI_ZA_SOCIJALNU_SKRB===undefined?null:parseInt(excel.PRIJEDLOG_CENTRI_ZA_SOCIJALNU_SKRB.split(" ")[0])===999?null: excel.PRIJEDLOG_CENTRI_ZA_SOCIJALNU_SKRB.substring(2),
          PRIJEDLOG_ZAVODI_ZA_ZAPOSLJAVANJE: excel.PRIJEDLOG_ZAVODI_ZA_ZAPOSLJAVANJE===""||excel.PRIJEDLOG_ZAVODI_ZA_ZAPOSLJAVANJE===undefined?null:parseInt(excel.PRIJEDLOG_ZAVODI_ZA_ZAPOSLJAVANJE.split(" ")[0])===999?null:  excel.PRIJEDLOG_ZAVODI_ZA_ZAPOSLJAVANJE.substring(2),
          PRIJEDLOG_JAVNI_SPORTSKI_SADRZAJI: excel.PRIJEDLOG_JAVNI_SPORTSKI_SADRZAJI===""||excel.PRIJEDLOG_JAVNI_SPORTSKI_SADRZAJI===undefined?null:parseInt(excel.PRIJEDLOG_JAVNI_SPORTSKI_SADRZAJI.split(" ")[0])===999?null: excel.PRIJEDLOG_JAVNI_SPORTSKI_SADRZAJI.substring(2), 
          PRIJEDLOG_KULTURNE_USTANOVE:excel.PRIJEDLOG_KULTURNE_USTANOVE===""||excel.PRIJEDLOG_KULTURNE_USTANOVE===undefined?null:parseInt(excel.PRIJEDLOG_KULTURNE_USTANOVE.split(" ")[0])===999?null:excel.PRIJEDLOG_KULTURNE_USTANOVE.substring(2), 
          PRIJEDLOG_JAVNI_PREVOZI:excel.PRIJEDLOG_JAVNI_PREVOZI===""||excel.PRIJEDLOG_JAVNI_PREVOZI===undefined?null:parseInt(excel.PRIJEDLOG_JAVNI_PREVOZI.split(" ")[0])===999?null: excel.PRIJEDLOG_JAVNI_PREVOZI.substring(2),
          PRIJEDLOG_DOSTUPNOST_INTERNETA: excel.PRIJEDLOG_DOSTUPNOST_INTERNETA===""||excel.PRIJEDLOG_DOSTUPNOST_INTERNETA===undefined?null:parseInt(excel.PRIJEDLOG_DOSTUPNOST_INTERNETA.split(" ")[0])===999?null: excel.PRIJEDLOG_DOSTUPNOST_INTERNETA.substring(2),
          PRIJEDLOG_DOSTUPNOST_TRGOVINA: excel.PRIJEDLOG_DOSTUPNOST_TRGOVINA===""||excel.PRIJEDLOG_DOSTUPNOST_TRGOVINA===undefined?null:parseInt(excel.PRIJEDLOG_DOSTUPNOST_TRGOVINA.split(" ")[0])===999?null:  excel.PRIJEDLOG_DOSTUPNOST_TRGOVINA.substring(2),

          USLUGE_NEDOSTUPNE_ID: excel.USLUGE_NEDOSTUPNE_ID===""||excel.USLUGE_NEDOSTUPNE_ID===undefined?null: excel.USLUGE_NEDOSTUPNE_ID.substring(2),
          RAZLOG_NEDOSTUPNE_USLUGE: excel.RAZLOG_NEDOSTUPNE_USLUGE===""||excel.RAZLOG_NEDOSTUPNE_USLUGE===undefined?null:excel.RAZLOG_NEDOSTUPNE_USLUGE,
          SUDJELUJETE_DRUGA_USLUGA_ID:excel.SUDJELUJETE_DRUGA_USLUGA_ID==="" || excel.SUDJELUJETE_DRUGA_USLUGA_ID ===undefined ?null: parseInt(excel.SUDJELUJETE_DRUGA_USLUGA_ID.split(" ")[0]),
          NAZIV_DRUGE_USLUGE: excel.NAZIV_DRUGE_USLUGE===""||excel.NAZIV_DRUGE_USLUGE===undefined?null:excel.NAZIV_DRUGE_USLUGE,
          OBITELJ_MIROVINA_ID: excel.OBITELJ_MIROVINA_ID==="" || excel.OBITELJ_MIROVINA_ID ===undefined ?null: (excel.OBITELJ_MIROVINA_ID.split(" ")[0]==="8"?-1:(excel.OBITELJ_MIROVINA_ID.split(" ")[0]==="9"?-2:parseInt(excel.OBITELJ_MIROVINA_ID.split(" ")[0]))),
          IZNOS_OBITELJSKE_MIROVINE_ID:excel.IZNOS_OBITELJSKE_MIROVINE_ID==="" || excel.IZNOS_OBITELJSKE_MIROVINE_ID ===undefined ?null:(excel.IZNOS_OBITELJSKE_MIROVINE_ID.split(" ")[0]==="9"?-2:parseInt(excel.IZNOS_OBITELJSKE_MIROVINE_ID.split(" ")[0])),
          RAZLOG_OBITELJSKE_MIROVINE_ID: excel.RAZLOG_OBITELJSKE_MIROVINE_ID===""||excel.RAZLOG_OBITELJSKE_MIROVINE_ID===undefined?null:excel.RAZLOG_OBITELJSKE_MIROVINE_ID,
          OBITELJ_DRUGA_PRAVA_ID:excel.OBITELJ_DRUGA_PRAVA_ID==="" || excel.OBITELJ_DRUGA_PRAVA_ID ===undefined ?null:(excel.OBITELJ_DRUGA_PRAVA_ID.split(" ")[0]==="8"?-1:(excel.OBITELJ_DRUGA_PRAVA_ID.split(" ")[0]==="9"?-2:parseInt(excel.OBITELJ_DRUGA_PRAVA_ID.split(" ")[0]))),
          OBITELJ_OSTVARILA_PRAVA_ID: excel.OBITELJ_OSTVARILA_PRAVA_ID===""||excel.OBITELJ_OSTVARILA_PRAVA_ID===undefined?null:excel.OBITELJ_OSTVARILA_PRAVA_ID,
          OBITELJ_DRUGA_PRAVA_RAZLOG: excel.OBITELJ_DRUGA_PRAVA_RAZLOG===""||excel.OBITELJ_DRUGA_PRAVA_RAZLOG===undefined?null:excel.OBITELJ_DRUGA_PRAVA_RAZLOG,
          PKZ3_PKZ4:PKZ3,
          ORTOPEDSKA_POMAGALA:ortopedskaPomagala,
          PROGRAM_PSIHOPOMOCI:programPsiho,
          PKZ5:pkz5,
        }
        for(var item of anketaObj.PKZ3_PKZ4){
            item.MJESTO=anketaObj.PREBIVALISTE
            item.ZUPANIJA=anketaObj.ZUPANIJA_PREBIVALISTA
            item.POST_BROJ=anketaObj.POSTANSKI_BROJ
            item.ADRESA=anketaObj.ULICA_STANOVANJA
        }
        console.log(anketaObj);
        setAnketaPrazna(anketaObj);
    })
      })
    })
    
    
  }

  return (
    <div className="App">
      <div className="naslovInput">
        <header>CONVERT EXCEL TO JSON</header>
      </div>
      <hr/>
      <div className="uploadInput">
        <input style={{color:'black'}} type="number" value={broj} onChange={(e)=>setBroj(parseInt(e.target.value))}/>
      </div>
      <div className="uploadInput">
        <input type="file"  id="fileUpload" onChange={(e)=>selectFile(e)} accept=".xls,.xlsx"/>
      </div>
      <hr/>
      <div className="convertInput">
        <button type="button" onClick={(e)=>convertExcelToJSON()}>CONVERT</button>
      </div>
      <hr/>
      <div className="parseInput">
        <button type="button" onClick={()=>parseData(excel)}>PARSE</button>
      </div>
      <hr/>
      <div className="logInput">
        <button type="button" onClick={()=>doneConvert?console.log(excel):console.log("CONVERT NOT FINISHED")}>OBJEKT</button>
      </div>
      <div className="logInput">
        <button type="button" onClick={()=>{insertData();console.log("UNESENO")}}>UNESI</button>
      </div>
    </div>
  );
}

export default App;
