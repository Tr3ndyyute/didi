'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Heart, Moon, Music2, Sparkles, Eye, LockKeyhole, RotateCcw } from 'lucide-react';
import './globals.css';

type CaseFile = { number: string; title: string; icon: string; body: React.ReactNode; note: string };

const cases: CaseFile[] = [
  {
    number: '001', title: 'The Smile', icon: '☺',
    body: <>Your smile…<br/><br/>It&apos;s the kind of smile that makes everything better, even on the days I&apos;m not having a good one.</>,
    note: 'Unfortunately, you don’t even try. And it works. ♡'
  },
  {
    number: '002', title: 'The Lips', icon: '💋',
    body: <><span className="chat-label">Her:</span><br/>“I like your lips.” 😌<br/><br/><span className="chat-label">Me:</span><br/>“Noted. Very important evidence.”</>,
    note: 'Further investigation required… 👀'
  },
  {
    number: '003', title: 'The Problem', icon: '👀',
    body: <>The problem isn&apos;t that we matched.<br/><br/>The problem is that talking to you is becoming way too easy.<br/><br/><em>And I&apos;m starting to like it.</em> ♡</>,
    note: 'This may be a problem… but it’s a good one.'
  },
  {
    number: '004', title: 'The Chemistry', icon: '⚡',
    body: <div className="evidence-list"><div>💬 <span>Conversation is dangerously easy.</span></div><div>♡ <span>Flirting levels are unnecessarily high.</span></div><div>✦ <span>Neither party appears interested in stopping.</span></div></div>,
    note: 'Case remains suspiciously cute.'
  },
  {
    number: '005', title: 'The Verdict', icon: '♡',
    body: <>After four days of investigation…<br/><br/>I&apos;ve concluded that meeting you was a pretty nice plot twist.</>,
    note: 'Investigation status: ongoing. No complaints so far. ♡'
  }
];

const questions = [
  { q: 'What would you pick for a perfect lazy evening?', options: ['A cosy movie', 'Good food & deep talks', 'Music & random conversations', 'Honestly… depends on the company 😌'] },
  { q: 'What gets your attention first?', options: ['A smile', 'Eyes', 'Energy / personality', 'A good sense of humour'] },
  { q: 'What kind of conversation do you enjoy?', options: ['Silly & playful', 'Deep & meaningful', 'Flirty & chaotic', 'A dangerous combination of all three'] },
  { q: 'Be honest… how suspicious is this website?', options: ['A little 😂', 'Very suspicious', 'I’m impressed', 'I secretly love it'] },
];

export default function Home() {
  const [section, setSection] = useState<'home'|'cases'|'quiz'|'final'>('home');
  const [caseIndex, setCaseIndex] = useState(0);
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [music, setMusic] = useState(false);
  const [night, setNight] = useState(false);

  const openCases = () => { setSection('cases'); setCaseIndex(0); window.scrollTo({top:0, behavior:'smooth'}); };
  const nextCase = () => { if (caseIndex < cases.length - 1) setCaseIndex(i => i + 1); else setSection('quiz'); window.scrollTo({top:0, behavior:'smooth'}); };
  const chooseAnswer = (i: number) => {
    const next = [...answers]; next[question] = i; setAnswers(next);
    if (question < questions.length - 1) setQuestion(q => q + 1); else setSection('final');
    window.scrollTo({top:0, behavior:'smooth'});
  };
  const reset = () => { setSection('home'); setCaseIndex(0); setQuestion(0); setAnswers([]); window.scrollTo({top:0, behavior:'smooth'}); };

  return <main className={night ? 'app night' : 'app'}>
    <nav className="nav">
      <button className="brand" onClick={reset}>The Didi Files <Heart size={15} fill="currentColor" /></button>
      <div className="nav-links">
        <button onClick={reset}>Home</button><button onClick={openCases}>Case Files</button><button onClick={() => setSection('quiz')}>Compatibility</button><button onClick={() => setSection('final')}>Final Report</button>
      </div>
      <div className="nav-icons"><button onClick={() => setMusic(!music)} aria-label="music"><Music2 size={17} className={music ? 'active-icon' : ''}/></button><button onClick={() => setNight(!night)} aria-label="theme"><Moon size={17}/></button></div>
    </nav>

    {section === 'home' && <section className="hero page-enter">
      <div className="scribble s1">Tinder<br/>+<br/>You + Me?</div><div className="scribble s2">Good vibes<br/>only ♡</div>
      <div className="hero-copy"><div className="eyebrow">CONFIDENTIAL • CASE FILE 001</div><h1><span>The</span><strong>DIDI</strong> FILES <Heart className="title-heart" fill="currentColor"/></h1><p className="subtitle">An investigation that started<br/><b>4 days ago…</b></p>
        <div className="case-card"><p><b>Subject:</b> Didi</p><p><b>Status:</b> Extremely cute & highly distracting</p><p><b>Threat level:</b> <span className="hearts">♥ ♥ ♥</span></p></div>
        <button className="primary" onClick={openCases}>Open File <ArrowRight size={18}/></button>
        <p className="under-note">“I was supposed to just match with you…<br/>somehow we ended up here.” ♡</p>
      </div>
      <div className="polaroid hero-polaroid"><div className="photo-placeholder"><Heart fill="currentColor" size={42}/></div><div>Didi ♡</div></div>
    </section>}

    {section === 'cases' && <section className="content page-enter"><div className="back" onClick={reset}><ArrowLeft size={15}/> Back to Files</div><div className="progress"><span>{caseIndex + 1} / {cases.length}</span><div><i style={{width:`${((caseIndex+1)/cases.length)*100}%`}}/></div></div><article className="case-view"><div className="case-number">CASE #{cases[caseIndex].number}</div><h2>{cases[caseIndex].title} <span>{cases[caseIndex].icon}</span></h2><div className="case-grid"><div className="quote-card">{cases[caseIndex].body}</div><div className="polaroid mini"><div className="photo-placeholder"><Heart fill="currentColor" size={32}/></div><div>Evidence ♡</div></div></div><div className="sticky-note">{cases[caseIndex].note}</div><button className="secondary" onClick={nextCase}>{caseIndex === cases.length - 1 ? 'Take the Compatibility Test' : 'Next Case'} <ArrowRight size={17}/></button></article></section>}

    {section === 'quiz' && <section className="content quiz page-enter"><div className="back" onClick={reset}><ArrowLeft size={15}/> Back to Files</div><div className="quiz-header"><Sparkles size={19}/><span>The Compatibility Test</span><Heart size={17} fill="currentColor"/></div><p>Let&apos;s see how well we actually know each other…</p><div className="quiz-card"><div className="q-top"><span>QUESTION {question+1}</span><span>{question+1}/{questions.length}</span></div><h3>{questions[question].q}</h3><div className="options">{questions[question].options.map((o,i)=><button key={o} onClick={()=>chooseAnswer(i)}><span>{String.fromCharCode(65+i)}</span>{o}</button>)}</div></div><div className="quiz-progress"><i style={{width:`${((question+1)/questions.length)*100}%`}}/></div></section>}

    {section === 'final' && <section className="final page-enter"><div className="report-icon"><LockKeyhole size={25}/></div><div className="eyebrow">CONFIDENTIAL • FINAL REPORT</div><h2>FINAL REPORT</h2><p className="final-sub">After 4 days of investigation, the evidence suggests:</p><div className="report-list"><div><Check/> Conversation is dangerously easy</div><div><Check/> Flirting levels are unnecessarily high</div><div><Check/> Her smile is a serious problem</div><div><Check/> Somehow, I&apos;m enjoying all of this</div></div><div className="status"><small>CASE STATUS:</small><b><span/> Investigation ongoing…</b></div><p className="final-note">Let&apos;s not rush the ending. ♡</p><div className="signature">Didi, I&apos;m glad we matched. ♡</div><button className="reset" onClick={reset}><RotateCcw size={15}/> Replay the investigation</button></section>}

    <footer>The Didi Files • Est. 2026 • Made with questionable intentions ♡</footer>
  </main>;
}
