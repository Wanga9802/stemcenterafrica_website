import { useParams, Link } from 'react-router-dom';
import ProgramHero from '../Components/ProgramHero';
import ProgramOutline from '../Components/ProgramOutline';
import ProgramEvidence from '../Components/ProgramEvidence';
import StudentProjects from '../Components/StudentProjects';
import programs from '../data/Programs';

export default function ProgramDetail() {
  const { slug } = useParams();
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    return (
      <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>
        <h1>Program Not Found</h1>
        <p>We couldn't find the program you're looking for.</p>
        <Link to="/programs">← Back to Programs</Link>
      </div>
    );
  }

  return (
    <>
      <ProgramHero program={program} />
      <ProgramOutline program={program} />
      <ProgramEvidence programSlug={program.slug} programTitle={program.title} />
      <StudentProjects programSlug={program.slug} programTitle={program.title} />
    </>
  );
}
