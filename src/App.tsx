import React from 'react';
import './App.css';
import XLSX from 'xlsx';
import axios from 'axios';
import { exec } from 'node:child_process';

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
      var osoba_index;
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
      else if(i+1===excel.INDEX4){
        osoba_index="O4_"
      }
      if(excel.F1_ID.split(" ")[0]==="1" && i===0)
      { 
        osoba_index="S_"
      }
      if(excel["pkz3x"+(i+1)+"b"]==="")break;
      var straniJezik
      pkzObj = {
        IME_PREZIME: excel["pkz3x"+(i+1)+"b"],
        GOD_RODENJA: excel["pkz3x"+(i+1)+"c"],
        SRODSTVO: excel["pkz3x"+(i+1)+"d"].split(" ")[0]==="6"?excel["pkz3x"+(i+1)+"d_dr"]:excel["pkz3x"+(i+1)+"d"].split(" ")[1],
        RAZINA_OBRAZOVANJA: excel[osoba_index+"RAZINA_OBRAZOVANJA"].substring(2),

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
          // GOD_RODJENJA_ISPUNJAVA: excel.GOD_RODENJA_ISPUNJAVA
          // srodstvo_id
          BROJ_OSOBA_U_KUCANSTVU: excel.BROJ_OSOBA_U_KUCANSTVU,
          POSTOJE_UZDRZAVANE_OSOBE: excel.POSTOJE_UZDRZAVANE_OSOBE===undefined?null:parseInt(excel.POSTOJE_UZDRZAVANE_OSOBE.split(" ")[0]),
          BROJ_UZDRZAVANIH_OSOBA: excel.BROJ_UZDRZAVANIH_OSOBA===undefined?null:parseInt(excel.BROJ_UZDRZAVANIH_OSOBA),
          ZUPANIJA_STRADAVANJA_ID: parseInt(excel.ZUPANIJA_STRADAVANJA_ID.split(" ")[0]),
          // NASELJE_STRADAVANJA_ID
          LOKACIJA_STRADAVANJA_ID:  excel.LOKACIJA_STRADAVANJA_ID==="" || excel.LOKACIJA_STRADAVANJA_ID===undefined ?null: excel.LOKACIJA_STRADAVANJA_ID,
          PODRUCJE_STRADAVANJA_ID: excel.PODRUCJE_STRADAVANJA_ID==="" || excel.PODRUCJE_STRADAVANJA_ID===undefined ?null: excel.PODRUCJE_STRADAVANJA_ID.substring(2),
          DAN_STRADAVANJA: excel.DAN_STRADAVANJA==="" || excel.DAN_STRADAVANJA===undefined ?null:excel.DAN_STRADAVANJA,
          MJESEC_STRADAVANJA: excel.MJESEC_STRADAVANJA==="" || excel.MJESEC_STRADAVANJA===undefined ?null:excel.MJESEC_STRADAVANJA,
          GODINA_STRADAVANJA: excel.GODINA_STRADAVANJA==="" || excel.GODINA_STRADAVANJA===undefined ?null:excel.GODINA_STRADAVANJA,
          VRSTA_STRADAVANJA_ID: excel.VRSTA_STRADAVANJA_ID==="" || excel.VRSTA_STRADAVANJA_ID===undefined ?null:parseInt(excel.VRSTA_STRADAVANJA_ID.split(" ")[0]),
          NAZIV_EKS: excel.NAZIV_EKS===""||excel.NAZIV_EKS===undefined?null:excel.NAZIV_EKS,
          OZNAKA_EKS: excel.OZNAKA_EKS===""||excel.OZNAKA_EKS===undefined?null:excel.OZNAKA_EKS,
          STUPANJ_TJELESNOG_OSTECENJA_ID:excel.STUPANJ_TJELESNOG_OSTECENJA_ID==="" || excel.STUPANJ_TJELESNOG_OSTECENJA_ID===undefined ?null: parseInt(excel.STUPANJ_TJELESNOG_OSTECENJA_ID.split(" ")[0]),
          DODATNI_OPIS_OZLJEDE: excel.DODATNI_OPIS_OZLJEDE===""||excel.DODATNI_OPIS_OZLJEDE===undefined?null:excel.DODATNI_OPIS_OZLJEDE,
          ZDRAVSTVENO_STANJE_PROMJENE_ID: excel.ZDRAVSTVENO_STANJE_PROMJENE_ID==="" || excel.ZDRAVSTVENO_STANJE_PROMJENE_ID===undefined ?null:parseInt(excel.ZDRAVSTVENO_STANJE_PROMJENE_ID.split(" ")[0]),
          ZDRAVSTVENO_STANJE_PROMJENE_OPIS: excel.ZDRAVSTVENO_STANJE_PROMJENE_OPIS===""?null:excel.ZDRAVSTVENO_STANJE_PROMJENE_OPIS,
          DIJAGNOZA_ID: excel.DIJAGNOZA_ID===""||excel.DIJAGNOZA_ID===undefined?null:excel.DIJAGNOZA_ID,
          // VRSTA_ZANIMANJA_ID
          MJESTO_STRADAVANJA_SUMNJIVO_ID:excel.MJESTO_STRADAVANJA_SUMNJIVO_ID==="" || excel.MJESTO_STRADAVANJA_SUMNJIVO_ID===undefined ?null: parseInt(excel.MJESTO_STRADAVANJA_SUMNJIVO_ID.split(" ")[0]),
          POSTUPAK_NAKNADA_STETE_ID: excel.POSTUPAK_NAKNADA_STETE_ID==="" || excel.POSTUPAK_NAKNADA_STETE_ID===undefined ?null:parseInt(excel.POSTUPAK_NAKNADA_STETE_ID.split(" ")[0]),
          POSTUPAK_NAKNADA_STETE_NACIN_ID: excel.POSTUPAK_NAKNADA_STETE_NACIN_ID==="" || excel.POSTUPAK_NAKNADA_STETE_NACIN_ID===undefined ?null:parseInt(excel.POSTUPAK_NAKNADA_STETE_NACIN_ID.split(" ")[0]),
          FAZA_NAKNADE_STETE_ID: excel.FAZA_NAKNADE_STETE_ID==="" || excel.FAZA_NAKNADE_STETE_ID===undefined ?null:parseInt(excel.FAZA_NAKNADE_STETE_ID.split(" ")[0]),
          ISHOD_POSTUPKA_NAKNADE_STETE_ID: excel.ISHOD_POSTUPKA_NAKNADE_STETE_ID==="" || excel.ISHOD_POSTUPKA_NAKNADE_STETE_ID===undefined ?null: parseInt(excel.ISHOD_POSTUPKA_NAKNADE_STETE_ID.split(" ")[0]),
          POSTUPAK_RADNE_SPOSOBNOSTI_ID: excel.POSTUPAK_RADNE_SPOSOBNOSTI_ID==="" || excel.POSTUPAK_RADNE_SPOSOBNOSTI_ID===undefined ?null:parseInt(excel.POSTUPAK_RADNE_SPOSOBNOSTI_ID.split(" ")[0]),
          OCJENA_RADNE_SPOSOBNOSTI_ID: excel.OCJENA_RADNE_SPOSOBNOSTI_ID==="" || excel.OCJENA_RADNE_SPOSOBNOSTI_ID===undefined ?null:parseInt(excel.OCJENA_RADNE_SPOSOBNOSTI_ID.split(" ")[0]),
          POTREBNA_TUDJA_POMOC_ID: excel.POTREBNA_TUDJA_POMOC_ID==="" || excel.POTREBNA_TUDJA_POMOC_ID===undefined ?null:parseInt(excel.POTREBNA_TUDJA_POMOC_ID.split(" ")[0]),
          POMOC_DRUGE_OSOBE_SASTOJI: excel.POMOC_DRUGE_OSOBE_SASTOJI==="" || excel.POMOC_DRUGE_OSOBE_SASTOJI===undefined?null:excel.POMOC_DRUGE_OSOBE_SASTOJI,
          // TJEDNO_SATI_POMOC_ID: TJEDNO_SATI_POMOC
          KORISNIK_DOPLATKA_ZA_POMOC_ID: excel.KORISNIK_DOPLATKA_ZA_POMOC_ID==="" || excel.KORISNIK_DOPLATKA_ZA_POMOC_ID===undefined ?null: parseInt(excel.KORISNIK_DOPLATKA_ZA_POMOC_ID.split(" ")[0]),
          KORISTITE_ORTOPEDSKO_POMAGALO_ID: excel.KORISTITE_ORTOPEDSKO_POMAGALO_ID==="" || excel.KORISTITE_ORTOPEDSKO_POMAGALO_ID===undefined ?null:  parseInt(excel.KORISTITE_ORTOPEDSKO_POMAGALO_ID.split(" ")[0]),
          PRAVO_PROFESIONALNE_REHABILITACIJE_ID: excel.PRAVO_PROFESIONALNE_REHABILITACIJE_ID==="" || excel.PRAVO_PROFESIONALNE_REHABILITACIJE_ID===undefined ?null: parseInt(excel.PRAVO_PROFESIONALNE_REHABILITACIJE_ID.split(" ")[0]),
          KAKVO_PRAVO_PROFESIONALNE_REH: excel.KAKVO_PRAVO_PROFESIONALNE_REH===""?null:excel.KAKVO_PRAVO_PROFESIONALNE_REH,
          FIZIKALNA_TERAPIJA_ID: excel.FIZIKALNA_TERAPIJA_ID==="" || excel.FIZIKALNA_TERAPIJA_ID===undefined ?null: parseInt(excel.FIZIKALNA_TERAPIJA_ID.split(" ")[0]),
          SUDIONIK_PROGRAMA_PSIHOPOMOCI_ID: excel.SUDIONIK_PROGRAMA_PSIHOPOMOCI_ID==="" || excel.SUDIONIK_PROGRAMA_PSIHOPOMOCI_ID===undefined ?null: parseInt(excel.SUDIONIK_PROGRAMA_PSIHOPOMOCI_ID.split(" ")[0]),
          POTREBNO_UKLJUCIVANJE_PSIHOPOMOCI_ID: excel.POTREBNO_UKLJUCIVANJE_PSIHOPOMOCI_ID==="" || excel.POTREBNO_UKLJUCIVANJE_PSIHOPOMOCI_ID===undefined ?null:  parseInt(excel.POTREBNO_UKLJUCIVANJE_PSIHOPOMOCI_ID.split(" ")[0]),
          NAKNADA_TJELESNOG_OSTECENJA_ID: excel.NAKNADA_TJELESNOG_OSTECENJA_ID==="" || excel.NAKNADA_TJELESNOG_OSTECENJA_ID===undefined ?null:  parseInt(excel.NAKNADA_TJELESNOG_OSTECENJA_ID.split(" ")[0]),
          POSTOTAK_TJELESNOG_OSTECENJA : excel.POSTOTAK_TJELESNOG_OSTECENJA,
          IZNOS_NAKNADE_TJELESNOG_OSTECENJA: excel.IZNOS_NAKNADE_TJELESNOG_OSTECENJA,
          NAKNADA_DATUM_OD: excel.NAKNADA_DATUM_OD_GODINA===undefined?null: new Date(parseInt(excel.NAKNADA_DATUM_OD_GODINA),parseInt(excel.NAKNADA_DATUM_OD_MJESEC)-1,1),
          // NAKNADA_DATUM_DO
          KORISNIK_INVALIDSKE_MIROVINE_ID: excel.KORISNIK_INVALIDSKE_MIROVINE_ID==="" || excel.KORISNIK_INVALIDSKE_MIROVINE_ID===undefined ?null: parseInt(excel.KORISNIK_INVALIDSKE_MIROVINE_ID.split(" ")[0]),
          RAZLOG_INVALIDSKE_MIROVINE_ID: excel.RAZLOG_INVALIDSKE_MIROVINE_ID==="" || excel.RAZLOG_INVALIDSKE_MIROVINE_ID===undefined ?null:  parseInt(excel.RAZLOG_INVALIDSKE_MIROVINE_ID.split(" ")[0]),
          IZNOS_INVALIDSKE_MIROVINE: excel.IZNOS_INVALIDSKE_MIROVINE,
          SOCIO_POTPORE_ID: excel.SOCIO_POTPORE_ID==="" || excel.SOCIO_POTPORE_ID===undefined ?null:  parseInt(excel.SOCIO_POTPORE_ID.split(" ")[0]),
          INSTITUCIJA_POTPORA: excel.INSTITUCIJA_POTPORA===""?null:excel.INSTITUCIJA_POTPORA,
          // INSTITUCIJA_POTPORA2 ??
          SOCIO_FINANCIRANO_ID: excel.SOCIO_FINANCIRANO_ID==="" || excel.SOCIO_FINANCIRANO_ID ===undefined ?null:   parseInt(excel.SOCIO_FINANCIRANO_ID.split(" ")[0]),
          SUSTAV_JAVNOG_OBRAZOVANJA: excel.SUSTAV_JAVNOG_OBRAZOVANJA===""||excel.SUSTAV_JAVNOG_OBRAZOVANJA===undefined?null:excel.SUSTAV_JAVNOG_OBRAZOVANJA,
          JAVNO_ZDRAVSTVO: excel.JAVNO_ZDRAVSTVO===""||excel.JAVNO_ZDRAVSTVO===undefined?null:excel.JAVNO_ZDRAVSTVO,
          POLICIJA: excel.POLICIJA===""||excel.POLICIJA===undefined?null:excel.POLICIJA,
          CENTRI_ZA_SOCIJALNU_SKRB: excel.CENTRI_ZA_SOCIJALNU_SKRB===""||excel.CENTRI_ZA_SOCIJALNU_SKRB===undefined?null:excel.CENTRI_ZA_SOCIJALNU_SKRB,
          ZAVODI_ZA_ZAPOSLJAVANJE: excel.ZAVODI_ZA_ZAPOSLJAVANJE===""||excel.ZAVODI_ZA_ZAPOSLJAVANJE===undefined?null:excel.ZAVODI_ZA_ZAPOSLJAVANJE,
          JAVNI_SPORTSKI_SADRZAJI: excel.JAVNI_SPORTSKI_SADRZAJI===""||excel.JAVNI_SPORTSKI_SADRZAJI===undefined?null:excel.JAVNI_SPORTSKI_SADRZAJI,
          KULTURNE_USTANOVE: excel.KULTURNE_USTANOVE===""||excel.KULTURNE_USTANOVE===undefined?null:excel.KULTURNE_USTANOVE,
          JAVNI_PREVOZI: excel.JAVNI_PREVOZI===""||excel.JAVNI_PREVOZI===undefined?null:excel.JAVNI_PREVOZI,
          DOSTUPNOST_INTERNETA: excel.DOSTUPNOST_INTERNETA===""||excel.DOSTUPNOST_INTERNETA===undefined?null:excel.DOSTUPNOST_INTERNETA,
          DOSTUPNOST_TRGOVINA: excel.DOSTUPNOST_TRGOVINA===""||excel.DOSTUPNOST_TRGOVINA===undefined?null:excel.DOSTUPNOST_TRGOVINA,

          KORISTI_SUSTAV_JAVNOG_OBRAZOVANJA: excel.KORISTI_SUSTAV_JAVNOG_OBRAZOVANJA==="" || excel.KORISTI_SUSTAV_JAVNOG_OBRAZOVANJA===undefined ?null: parseInt(excel.KORISTI_SUSTAV_JAVNOG_OBRAZOVANJA.split(" ")[0]),
          KORISTI_JAVNO_ZDRAVSTVO: excel.KORISTI_JAVNO_ZDRAVSTVO==="" || excel.KORISTI_JAVNO_ZDRAVSTVO ===undefined ?null:   parseInt(excel.KORISTI_JAVNO_ZDRAVSTVO.split(" ")[0]),
          KORISTI_POLICIJA: excel.KORISTI_POLICIJA==="" || excel.KORISTI_POLICIJA ===undefined ?null:  parseInt(excel.KORISTI_POLICIJA.split(" ")[0]),
          KORISTI_CENTRI_ZA_SOCIJALNU_SKRB: excel.KORISTI_CENTRI_ZA_SOCIJALNU_SKRB==="" || excel.KORISTI_CENTRI_ZA_SOCIJALNU_SKRB ===undefined ?null:  parseInt(excel.KORISTI_CENTRI_ZA_SOCIJALNU_SKRB.split(" ")[0]),
          KORISTI_ZAVODI_ZA_ZAPOSLJAVANJE: excel.KORISTI_ZAVODI_ZA_ZAPOSLJAVANJE==="" || excel.KORISTI_ZAVODI_ZA_ZAPOSLJAVANJE ===undefined ?null:   parseInt(excel.KORISTI_ZAVODI_ZA_ZAPOSLJAVANJE.split(" ")[0]),
          KORISTI_JAVNI_SPORTSKI_SADRZAJI: excel.KORISTI_JAVNI_SPORTSKI_SADRZAJI==="" || excel.KORISTI_JAVNI_SPORTSKI_SADRZAJI ===undefined ?null: parseInt(excel.KORISTI_JAVNI_SPORTSKI_SADRZAJI.split(" ")[0]),
          KORISTI_KULTURNE_USTANOVE:  excel.KORISTI_KULTURNE_USTANOVE==="" || excel.KORISTI_KULTURNE_USTANOVE ===undefined ?null: parseInt(excel.KORISTI_KULTURNE_USTANOVE.split(" ")[0]),
          KORISTI_JAVNI_PREVOZI: excel.KORISTI_JAVNI_PREVOZI==="" || excel.KORISTI_JAVNI_PREVOZI ===undefined ?null:  parseInt(excel.KORISTI_JAVNI_PREVOZI.split(" ")[0]),
          KORISTI_DOSTUPNOST_INTERNETA: excel.KORISTI_DOSTUPNOST_INTERNETA==="" || excel.KORISTI_DOSTUPNOST_INTERNETA ===undefined ?null:   parseInt(excel.KORISTI_DOSTUPNOST_INTERNETA.split(" ")[0]),

          PRIJEDLOG_SUSTAV_JAVNOG_OBRAZOVANJA: excel.PRIJEDLOG_SUSTAV_JAVNOG_OBRAZOVANJA===""||excel.PRIJEDLOG_SUSTAV_JAVNOG_OBRAZOVANJA===undefined?null: excel.PRIJEDLOG_SUSTAV_JAVNOG_OBRAZOVANJA.substring(2),
          PRIJEDLOG_JAVNO_ZDRAVSTVO: excel.PRIJEDLOG_JAVNO_ZDRAVSTVO===""||excel.PRIJEDLOG_JAVNO_ZDRAVSTVO===undefined?null:  excel.PRIJEDLOG_JAVNO_ZDRAVSTVO.substring(2),
          PRIJEDLOG_POLICIJA: excel.PRIJEDLOG_POLICIJA===""||excel.PRIJEDLOG_POLICIJA===undefined?null: excel.PRIJEDLOG_POLICIJA.substring(2),
          PRIJEDLOG_CENTRI_ZA_SOCIJALNU_SKRB: excel.PRIJEDLOG_CENTRI_ZA_SOCIJALNU_SKRB===""||excel.PRIJEDLOG_CENTRI_ZA_SOCIJALNU_SKRB===undefined?null:excel.PRIJEDLOG_CENTRI_ZA_SOCIJALNU_SKRB.substring(2),
          PRIJEDLOG_ZAVODI_ZA_ZAPOSLJAVANJE: excel.PRIJEDLOG_ZAVODI_ZA_ZAPOSLJAVANJE===""||excel.PRIJEDLOG_ZAVODI_ZA_ZAPOSLJAVANJE===undefined?null:  excel.PRIJEDLOG_ZAVODI_ZA_ZAPOSLJAVANJE.substring(2),
          PRIJEDLOG_JAVNI_SPORTSKI_SADRZAJI: excel.PRIJEDLOG_JAVNI_SPORTSKI_SADRZAJI===""||excel.PRIJEDLOG_JAVNI_SPORTSKI_SADRZAJI===undefined?null: excel.PRIJEDLOG_JAVNI_SPORTSKI_SADRZAJI.substring(2), 
          PRIJEDLOG_KULTURNE_USTANOVE:excel.PRIJEDLOG_KULTURNE_USTANOVE===""||excel.PRIJEDLOG_KULTURNE_USTANOVE===undefined?null: excel.PRIJEDLOG_KULTURNE_USTANOVE.substring(2), 
          PRIJEDLOG_JAVNI_PREVOZI:excel.PRIJEDLOG_JAVNI_PREVOZI===""||excel.PRIJEDLOG_JAVNI_PREVOZI===undefined?null: excel.PRIJEDLOG_JAVNI_PREVOZI.substring(2),
          PRIJEDLOG_DOSTUPNOST_INTERNETA: excel.PRIJEDLOG_DOSTUPNOST_INTERNETA===""||excel.PRIJEDLOG_DOSTUPNOST_INTERNETA===undefined?null: excel.PRIJEDLOG_DOSTUPNOST_INTERNETA.substring(2),
          PRIJEDLOG_DOSTUPNOST_TRGOVINA: excel.PRIJEDLOG_DOSTUPNOST_TRGOVINA===""||excel.PRIJEDLOG_DOSTUPNOST_TRGOVINA===undefined?null:  excel.PRIJEDLOG_DOSTUPNOST_TRGOVINA.substring(2),

          USLUGE_NEDOSTUPNE_ID: excel.USLUGE_NEDOSTUPNE_ID===""||excel.USLUGE_NEDOSTUPNE_ID===undefined?null: excel.USLUGE_NEDOSTUPNE_ID.substring(2),
          RAZLOG_NEDOSTUPNE_USLUGE: excel.RAZLOG_NEDOSTUPNE_USLUGE===""||excel.RAZLOG_NEDOSTUPNE_USLUGE===undefined?null:excel.RAZLOG_NEDOSTUPNE_USLUGE,
          SUDJELUJETE_DRUGA_USLUGA_ID:excel.SUDJELUJETE_DRUGA_USLUGA_ID==="" || excel.SUDJELUJETE_DRUGA_USLUGA_ID ===undefined ?null: parseInt(excel.SUDJELUJETE_DRUGA_USLUGA_ID.split(" ")[0]),
          NAZIV_DRUGE_USLUGE: excel.NAZIV_DRUGE_USLUGE===""||excel.NAZIV_DRUGE_USLUGE===undefined?null:excel.NAZIV_DRUGE_USLUGE,
          OBITELJ_MIROVINA_ID: excel.OBITELJ_MIROVINA_ID==="" || excel.OBITELJ_MIROVINA_ID ===undefined ?null: parseInt(excel.OBITELJ_MIROVINA_ID.split(" ")[0]),
          IZNOS_OBITELJSKE_MIROVINE_ID:excel.IZNOS_OBITELJSKE_MIROVINE_ID==="" || excel.IZNOS_OBITELJSKE_MIROVINE_ID ===undefined ?null: parseInt(excel.IZNOS_OBITELJSKE_MIROVINE_ID.split(" ")[0]),
          RAZLOG_OBITELJSKE_MIROVINE_ID: excel.RAZLOG_OBITELJSKE_MIROVINE_ID===""||excel.RAZLOG_OBITELJSKE_MIROVINE_ID===undefined?null:excel.RAZLOG_OBITELJSKE_MIROVINE_ID,
          OBITELJ_DRUGA_PRAVA_ID:excel.OBITELJ_DRUGA_PRAVA_ID==="" || excel.OBITELJ_DRUGA_PRAVA_ID ===undefined ?null:  parseInt(excel.OBITELJ_DRUGA_PRAVA_ID.split(" ")[0]),
          OBITELJ_OSTVARILA_PRAVA_ID: excel.OBITELJ_OSTVARILA_PRAVA_ID===""||excel.OBITELJ_OSTVARILA_PRAVA_ID===undefined?null:excel.OBITELJ_OSTVARILA_PRAVA_ID,
          OBITELJ_DRUGA_PRAVA_RAZLOG: excel.OBITELJ_DRUGA_PRAVA_RAZLOG===""||excel.OBITELJ_DRUGA_PRAVA_RAZLOG===undefined?null:excel.OBITELJ_DRUGA_PRAVA_RAZLOG
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
