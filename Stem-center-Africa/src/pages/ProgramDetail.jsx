import { useParams, Link } from 'react-router-dom';
import ProgramHero from '../Components/programs/ProgramHero';
import ProgramOverview from '../Components/programs/ProgramOverview';
import ProgramProjects from '../Components/programs/ProgramProjects';
import programs from '../data/programs';

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
      <ProgramOverview program={program} />
      <ProgramProjects programSlug={program.slug} programTitle={program.title} />
    </>
  );
}