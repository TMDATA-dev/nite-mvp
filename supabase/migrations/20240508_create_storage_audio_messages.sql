-- Crear bucket para almacenar archivos de audio
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'audio-messages',
  'audio-messages',
  TRUE,
  52428800, -- 50MB límite
  ARRAY['audio/mpeg', 'audio/mp3', 'audio/webm', 'audio/ogg', 'audio/wav']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Establecer políticas de seguridad para el bucket audio-messages
-- Cualquiera puede leer si el bucket es público
CREATE POLICY "Archivos de audio accesibles públicamente" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'audio-messages');

-- Solo usuarios autenticados pueden subir archivos (y solo a su carpeta)
CREATE POLICY "Los usuarios pueden subir archivos de audio a su carpeta" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'audio-messages' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Los usuarios solo pueden actualizar sus propios archivos
CREATE POLICY "Los usuarios pueden actualizar sus propios archivos de audio" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'audio-messages' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Los usuarios solo pueden eliminar sus propios archivos
CREATE POLICY "Los usuarios pueden eliminar sus propios archivos de audio" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'audio-messages' AND 
  auth.uid()::text = (storage.foldername(name))[1]
); 