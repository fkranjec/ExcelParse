import React from 'react';
import './App.css';
import XLSX from 'xlsx';
import axios from 'axios';

function App() {

  var selectedFile :any
  var excel :any
  var doneConvert :boolean = false

  interface anketa {
    ORTOPEDSKA_POMAGALA:[],
    PKZ3_PKZ4:[{
      IME_PREZIME:string,
      GOD_RODENJA:number,
      SRODSTVO:string,
      RAZINA_OBRAZOVANJA:number,
      STRANI_JEZIK:any[],
      MS_WORD:number,
      MS_EXCEL:number,
      MS_POWERPOINT:number,
      SLUZENJE_INTERNETOM:number,
      SLUZENJE_EMAILOM:number,
      DODATNE_RACUNALNE:any[],
      CERTIFIKATI:any[],
      VOZACKI:number,
      DODATNE_VJESTINE:any[],
      KRONICNA_BOLEST:string,
      WHO1:number,
      WHO2:number,
      WHO3:number,
      WHO4:number,
      WHO5:number,
      WHO6:number,
      WHO7:number,
      WHO8:number,
      WHO9:number,
      WHO10:number,
      WHO11:number,
      WHO12:number,
      WHO_2:number,
      WHO_3:number,
      WHO_4:number,
      DASS21_1:number,
      DASS21_2:number,
      DASS21_3:number,
      DASS21_4:number,
      DASS21_5:number,
      DASS21_6:number,
      DASS21_7:number,
      DASS21_8:number,
      DASS21_9:number,
      DASS21_10:number,
      DASS21_11:number,
      DASS21_12:number,
      DASS21_13:number,
      DASS21_14:number,
      DASS21_15:number,
      DASS21_16:number,
      DASS21_17:number,
      DASS21_18:number,
      DASS21_19:number,
      DASS21_20:number,
      DASS21_21:number,
      STR1:string,
      STR2_1:number,
      STR2_2:number,
      STR2_3:number,
      STR2_4:number,
      STR2_5:number,
      ZNANJE:any[],
      TRENUTNI_RADNI_STATUS_ID:null,
      TRENUTNO_ZANIMANJE_ID:null,
      PODJELA_ZANIMANJA_ID:null,
      PRIJAVLJEN_HZZO_ID:null,
      PRIJAVLJEN_HZZO_RAZLOG_ID:null,
      HZZO_BROJ_MJESECI:null,
      TRAZIO_POSAO_ID:null,
      TRAZIO_POSAO_BROJ_PUTA:null,
      POSLODAVCI:[],
      ISHOD_ZADNJEG_OBRACANJA_POSLODAVCU_ID:null,
      RAZLOG_NEOBRACANJA_POSLODAVCU_ID:null,
      KATEGORIJA_POSLOVA_ZELJELI_ID:null,
      ZUPANIJA_ZELJELI_RADITI_ID:null,
      NASELJE_ZELJELI_RADITI_ID:null,
      PREKVALIFIKACIJA_ID:null,
      PITANJE_5P11B_ID:null,
      NEZAINTERESIRAN_PREKVALIFIKACIJA_ID:null,
      NAZIV_TVRTKE:null,
      NAZIV_MJESTA_TVRTKE:null,
      NAZIV_ULICE_TVRTKE:null,
      KUCNI_BROJ_TVRTKE:null,
      RADILI_STRUCI_ID:null,
      NAZIV_STRUKE_ID:null,
      IZNOS_PLACE_ID:null,
      UKUPNO_PRIMANJA_ID:null,
      UGOVOR_O_DOZIVOTNOM_UZDRZAVANJU_ID:null,
      OSOBA_PRIMATE_UZDRZAVANJE_ID:null,
      IZNOS_UZDRZAVANJA_ID:null,
      DOZIVOTNO_UZDRZAVANJE_DAVATELJ_ID:null,
      BROJ_OSOBA_UZDRZAVATE:null,
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
  NAKNADA_DATUM_OD:string | null,
  NAKNADA_DATUM_DO:string | null,
  KORISNIK_INVALIDSKE_MIROVINE_ID:number | null,
  RAZLOG_INVALIDSKE_MIROVINE_ID:string | null,
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
          excel = jsonObject[0]
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

  const handlePkz3 = (excel:any)=>{
    var pkzObj;
    var pkzArr:any[] = [];
    for (var i=0;i<10;i++)
    {
      if(excel["pkz3x"+(i+1)+"b"]==="")break;
      pkzObj = {
        IME_PREZIME: excel["pkz3x"+(i+1)+"b"],
        GOD_RODENJA: excel["pkz3x"+(i+1)+"c"],
        SRODSTVO: excel["pkz3x"+(i+1)+"d"].split(" ")[0]==="6"?excel["pkz3x"+(i+1)+"d_dr"]:excel["pkz3x"+(i+1)+"d"].split(" ")[1],
        asd: null
      }
      pkzArr.push(pkzObj);
    }
  return pkzArr;
  }

  const parseData = (excel:any) => {
    var anketaObj;
    var prebivalisteVar:any;
    var boravisteVar:any;
    var posatnskiVar:any;
    var pkz3Obj:any;
    console.log(excel);
    var PKZ3 = handlePkz3(excel);
    console.log(PKZ3);
    axios.get("http://192.168.0.180:9000/search/mjesto",{
      params:{search_value: excel.PREBIVALISTE,}
    }).then(res =>{
      prebivalisteVar = res.data[0].MJESTO_ID
      posatnskiVar = res.data[0].POSTANSKI_BROJ
      axios.get("http://192.168.0.180:9000/search/mjesto",{
        params:{search_value: excel.BORAVISTE,}
        }).then(res =>{
          console.log(res.data)
          boravisteVar = res.data[0].MJESTO_ID
          axios.get("http://192.168.0.180:9000/search/mjesto",{
        params:{search_value: excel.NASELJE_RODENJA.split(" ")[1],}
      }).then(res=>{
        anketaObj = {
          IME_ZRTVE: excel.IME_ZRTVE===""?excel.pkz3x1b.split(" ")[0]:excel.IME_ZRTVE,
          PREZIME_ZRTVE: excel.PREZIME_ZRTVE===""?excel.pkz3x1b.split(" ")[1]:excel.PREZIME_ZRTVE,
          OIB: excel.OIB===""?null:parseInt(excel.OIB),
          SPOL: parseInt(excel.SPOL),
          DATUM_RODENJA: new Date(excel.GODINA_RODENJA,excel.MJESEC_RODENJA-1,excel.DAN_RODENJA),
          NASELJE_RODENJA: res.data[0].MJESTO_ID,
          ZUPANIJA_RODENJA: parseInt(excel.ZUPANIJA_RODENJA.split(" ")[0]),
          DRZAVA_RODENJA: excel.DRZAVA_RODENJA.split(" ")[1],
          DRZAVLJANSTVO: excel.DRZAVLJANSTVO.split(" ")[1],
          PREBIVALISTE: prebivalisteVar,
          BORAVISTE: boravisteVar,
          POSTANSKI_BROJ: posatnskiVar,
          ULICA_STANOVANJA: excel.ULICA_STANOVANJA,
          FIKSNI: excel.FIKSNI,
          MOBILNI: excel.MOBILNI,
          EMAIL: excel.EMAIL,
          BRACNO_STANJE: parseInt(excel.BRACNO_STANJE.split(" ")[0]),
          ZUPANIJA_PREBIVALISTA: null,
          F1_ID: parseInt(excel.F1_ID.split(" ")[0]),
          F2_ID: excel.F2_ID===undefined?null:parseInt(excel.F2_ID.split(" ")[0]),
        }
        console.log(anketaObj);
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
    </div>
  );
}

export default App;
