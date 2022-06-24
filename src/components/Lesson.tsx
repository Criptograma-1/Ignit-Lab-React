import { CheckCircle, Lock} from 'phosphor-react'
import { format, isPast } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{slug: string}>();
  const isActive = slug === props.slug;

  const isLessonavailable = isPast(props.availableAt);
  const availableDateFormat = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })

  return (
    <Link to={`/event/lesson/${props.slug}`} className='group'>

      <span className="text-gray-300">
        {availableDateFormat}
      </span>

      <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors ${isActive? 'bg-green-500': '' }`}>

        <header className="flex items-center justify-between">
          {isLessonavailable ? (
            <span className={`text-sm font-medium flex items-center gap-2 ${isActive ? 'text-white' : 'text-blue-500'}`}>
             <CheckCircle size={20}/>
             Conteúdo liberado
            </span>
          ):(  
            <span className="text-sm font-medium flex items-center gap-2">
              <Lock size={20}/>
              Em breve
            </span>
          )}

          {props.type === 'live' ? (
            <span className={`text-xs rounded border px-2 py-[0.125rem] font-bold  ${isActive ? 'text-white border-white' : 'text-green-300 border border-green-300'}`}>
            AO VIVO
          </span>
          ): (
            <span className={`text-xs rounded px-2 py-[0.125rem] text-white border font-bold ${isActive ? 'border-white' : 'border-green-300'}`}>
            AULA PRÁTICA
          </span>
          )}
        </header>

        <strong className="text-gray-200 mt-5 block">
          {props.title}
        </strong>

      </div>

    </Link>
  )
}